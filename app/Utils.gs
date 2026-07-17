const MILISSEGUNDOS_POR_DIA = 86400000;

function localizarElemento(elemento, nome) {
  if (!elemento) {
    return null;
  }

  if (elemento.getName() === nome) {
    return elemento;
  }

  for (const filho of elemento.getChildren()) {
    const encontrado = localizarElemento(filho, nome);

    if (encontrado) {
      return encontrado;
    }
  }

  return null;
}

function obterTextoDireto(elemento, nome) {
  if (!elemento) {
    return "";
  }

  const filho = elemento.getChildren().find((item) => item.getName() === nome);
  return filho ? filho.getText().trim() : "";
}

function localizarTexto(elemento, nome) {
  const encontrado = localizarElemento(elemento, nome);
  return encontrado ? encontrado.getText().trim() : "";
}

function converterNumero(valor) {
  return Number(String(valor || "0").replace(",", ".")) || 0;
}

function converterData(valor) {
  if (!valor) {
    return "";
  }

  const [ano, mes, dia] = String(valor).substring(0, 10).split("-").map(Number);
  return ano && mes && dia ? new Date(ano, mes - 1, dia) : "";
}

function calcularDias(emissao, vencimento) {
  if (!(emissao instanceof Date) || !(vencimento instanceof Date)) {
    return "";
  }

  return Math.round((vencimento.getTime() - emissao.getTime()) / MILISSEGUNDOS_POR_DIA);
}

function identificarFilial(cnpj) {
  const filiais = {
    "58188756001249": "BK",
    "58188756002210": "CLIA",
    "58188756000196": "MATRIZ",
    "58188756000277": "IPA"
  };

  return filiais[String(cnpj || "").replace(/\D/g, "")] || "Não identificada";
}

function gerarId() {
  return Utilities.getUuid();
}
