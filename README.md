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

## Configuração

1. Crie uma planilha no Google Sheets.
2. Abra **Extensões > Apps Script**.
3. Crie os arquivos com os mesmos nomes da pasta `app`.
4. Cole o conteúdo de cada arquivo.
5. Atualize a planilha.
6. Use o menu **FiscalFlow**.
7. Autorize o acesso ao Gmail e ao Google Sheets.

## Abas criadas

A automação cria as abas `notas` e `LOG` quando necessário.

## Demonstração

Abra `demo/index.html` no navegador. Os dados são fictícios.

## Privacidade

Não publique notas fiscais reais, credenciais, tokens ou dados confidenciais.

## Licença

MIT.
