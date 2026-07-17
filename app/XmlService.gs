function processarMensagem(mensagem) {
  return obterAnexosXml(mensagem)
    .map((anexo) => extrairDadosXml(anexo.getDataAsString("UTF-8")))
    .filter(Boolean)
    .map((nota) => ({
      ...nota,
      assuntoEmail: mensagem.getSubject(),
      dataInclusao: new Date()
    }));
}

function extrairDadosXml(conteudoXml) {
  try {
    const documento = XmlService.parse(conteudoXml);
    const infNFe = localizarElemento(documento.getRootElement(), "infNFe");

    if (!infNFe) {
      registrarLog("XML inválido", "Elemento infNFe não encontrado.");
      return null;
    }

    const emitente = localizarElemento(infNFe, "emit");
    const destinatario = localizarElemento(infNFe, "dest");
    const identificacao = localizarElemento(infNFe, "ide");
    const total = localizarElemento(infNFe, "ICMSTot");
    const cobranca = localizarElemento(infNFe, "cobr");
    const atributoId = infNFe.getAttribute("Id");
    const cnpjFilial = obterTextoDireto(destinatario, "CNPJ");
    const emissao =
      obterTextoDireto(identificacao, "dhEmi") ||
      obterTextoDireto(identificacao, "dEmi");

    return {
      tipo: "Produto",
      fornecedor: obterTextoDireto(emitente, "xNome"),
      cnpjFornecedor: obterTextoDireto(emitente, "CNPJ"),
      numeroNota: obterTextoDireto(identificacao, "nNF"),
      chaveAcesso: atributoId ? atributoId.getValue().replace(/^NFe/, "") : "",
      filial: identificarFilial(cnpjFilial),
      cnpjFilial,
      emissao: converterData(emissao),
      vencimento: converterData(localizarTexto(cobranca, "dVenc")),
      valor: converterNumero(obterTextoDireto(total, "vNF")),
      status: "Processada"
    };
  } catch (erro) {
    registrarLog("Erro ao processar XML", erro.message);
    return null;
  }
}
