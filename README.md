# Projeto de Automação de Testes - Cypress + Cucumber (BDD)

Este repositório contém automações de testes **Web e API** utilizando **Cypress + Cucumber (BDD)** e **JavaScript**.

## Tecnologias

- Cypress → Testes E2E
- Cucumber → Cenários em BDD
- JavaScript → Linguagem
- @badeball/cypress-cucumber-preprocessor → Integração Cypress + Cucumber
- esbuild → Pré-processador

## Estrutura de Pastas

```
automation-exercise-tests/
├── cypress/
│   ├── e2e/
│   │   ├── web/
│   │   │   ├── login.feature
│   │   │   ├── search.feature
│   │   │   └── cart.feature
│   │   └── api/
│   │       └── trello.feature
│   └── step_definitions/
│       ├── web/
│       │   ├── loginSteps.js
│       │   ├── searchSteps.js
│       │   └── cartSteps.js
│       └── api/
│           └── trelloSteps.js
├── cypress.config.js
├── package.json
└── README.md
```

## Instalação

```bash
git clone <url-do-repo>
cd automation-exercise-tests
npm install
```

## Scripts

```bash
npm run cy:open   # Executa no modo interativo
npm run cy:run            # Executa em headless
```

## Testes Web

- **Login** → Autenticação de usuário
- **Busca** → Pesquisa de produtos
- **Carrinho** → Adição e validação no checkout

## Testes API

- **Trello** → GET em `https://api.trello.com/1/actions/592f11060f95a3d3d46a987a`
  - Verifica status 200
  - Valida campo `list.name`

