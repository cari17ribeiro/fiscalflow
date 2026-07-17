function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("FiscalFlow")
    .addItem("Preparar estrutura", "prepararEstrutura")
    .addItem("Processar notas fiscais", "processarNotasFiscais")
    .addItem("Abrir dashboard", "abrirDashboard")
    .addToUi();
}

function prepararEstrutura() {
  const planilha = SpreadsheetApp.getActiveSpreadsheet();
  prepararAbaNotas(planilha);
  prepararAbaLog(planilha);
  SpreadsheetApp.getUi().alert("Estrutura preparada com sucesso.");
}

function processarNotasFiscais() {
  const mensagens = buscarMensagensComXml();
  const notas = mensagens.flatMap(processarMensagem);
  const resultado = salvarNotas(notas);

  SpreadsheetApp.getUi().alert(
    `Processamento concluído. Inseridas: ${resultado.inseridas}. Duplicadas: ${resultado.duplicadas}.`
  );
}

function abrirDashboard() {
  const url = ScriptApp.getService().getUrl();
  const html = HtmlService.createHtmlOutput(
    `<script>window.open("${url}", "_blank");google.script.host.close();</script>`
  );

  SpreadsheetApp.getUi().showModalDialog(html, "FiscalFlow");
}
