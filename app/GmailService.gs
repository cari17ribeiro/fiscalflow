function buscarMensagensComXml() {
  const consulta = "newer_than:7d has:attachment filename:xml";
  const mensagens = [];

  GmailApp.search(consulta).forEach((thread) => {
    thread.getMessages().forEach((mensagem) => {
      if (obterAnexosXml(mensagem).length > 0) {
        mensagens.push(mensagem);
      }
    });
  });

  return mensagens;
}

function obterAnexosXml(mensagem) {
  return mensagem
    .getAttachments({ includeInlineImages: false, includeAttachments: true })
    .filter((anexo) => anexo.getName().toLowerCase().endsWith(".xml"));
}
