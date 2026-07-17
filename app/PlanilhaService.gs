const CABECALHOS_NOTAS = [
  "ID",
  "TIPO",
  "FORNECEDOR",
  "CNPJ FORNECEDOR",
  "NF",
  "CHAVE ACESSO",
  "FILIAL",
  "CNPJ FILIAL",
  "EMISSÃO",
  "VENCIMENTO",
  "DIAS",
  "VALOR",
  "STATUS",
  "ASSUNTO EMAIL",
  "DATA INCLUSÃO"
];

function prepararAbaNotas(planilha) {
  const aba = planilha.getSheetByName("notas") || planilha.insertSheet("notas");

  if (aba.getLastRow() === 0) {
    aba.appendRow(CABECALHOS_NOTAS);
    aba.getRange(1, 1, 1, CABECALHOS_NOTAS.length).setFontWeight("bold");
    aba.setFrozenRows(1);
  }

  return aba;
}

function prepararAbaLog(planilha) {
  const aba = planilha.getSheetByName("LOG") || planilha.insertSheet("LOG");

  if (aba.getLastRow() === 0) {
    aba.appendRow(["DATA", "TIPO", "MENSAGEM"]);
    aba.getRange(1, 1, 1, 3).setFontWeight("bold");
    aba.setFrozenRows(1);
  }

  return aba;
}

function salvarNotas(notas) {
  const aba = prepararAbaNotas(SpreadsheetApp.getActiveSpreadsheet());
  const chaves = obterChavesExistentes(aba);
  const linhas = [];
  let duplicadas = 0;

  notas.forEach((nota) => {
    if (nota.chaveAcesso && chaves.has(nota.chaveAcesso)) {
      duplicadas += 1;
      registrarLog("Nota duplicada", `Chave ${nota.chaveAcesso} já registrada.`);
      return;
    }

    linhas.push([
      gerarId(),
      nota.tipo,
      nota.fornecedor,
      nota.cnpjFornecedor,
      nota.numeroNota,
      nota.chaveAcesso,
      nota.filial,
      nota.cnpjFilial,
      nota.emissao,
      nota.vencimento,
      calcularDias(nota.emissao, nota.vencimento),
      nota.valor,
      nota.status,
      nota.assuntoEmail,
      nota.dataInclusao
    ]);

    if (nota.chaveAcesso) {
      chaves.add(nota.chaveAcesso);
    }
  });

  if (linhas.length > 0) {
    aba
      .getRange(aba.getLastRow() + 1, 1, linhas.length, CABECALHOS_NOTAS.length)
      .setValues(linhas);
  }

  return { inseridas: linhas.length, duplicadas };
}

function obterChavesExistentes(aba) {
  if (aba.getLastRow() < 2) {
    return new Set();
  }

  const chaves = aba
    .getRange(2, 6, aba.getLastRow() - 1, 1)
    .getDisplayValues()
    .flat()
    .filter(Boolean);

  return new Set(chaves);
}

function registrarLog(tipo, mensagem) {
  const aba = prepararAbaLog(SpreadsheetApp.getActiveSpreadsheet());
  aba.appendRow([new Date(), tipo, mensagem]);
}
