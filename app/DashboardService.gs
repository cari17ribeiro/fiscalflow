function doGet() {
  return HtmlService.createTemplateFromFile("Index")
    .evaluate()
    .setTitle("FiscalFlow")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function obterDadosDashboard() {
  const aba = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("notas");

  if (!aba || aba.getLastRow() < 2) {
    return [];
  }

  const valores = aba.getDataRange().getDisplayValues();
  const cabecalhos = valores.shift();

  return valores.map((linha) =>
    Object.fromEntries(cabecalhos.map((cabecalho, indice) => [cabecalho, linha[indice]]))
  );
}
