# FiscalFlow

Automação para processamento de notas fiscais recebidas por e-mail.

O projeto usa Google Apps Script para localizar anexos XML no Gmail, extrair dados fiscais, identificar a filial destinatária, evitar duplicidades e registrar as informações no Google Sheets.

## Tecnologias

- Google Apps Script
- JavaScript
- Gmail
- Google Sheets
- XML
- HTML e CSS

## Estrutura

```text
fiscalflow/
├── README.md
├── LICENSE
├── .gitignore
├── app/
│   ├── Codigo.gs
│   ├── GmailService.gs
│   ├── XmlService.gs
│   ├── PlanilhaService.gs
│   ├── DashboardService.gs
│   ├── Utils.gs
│   └── Index.html
├── demo/
│   └── index.html
└── docs/
    └── .gitkeep
```


