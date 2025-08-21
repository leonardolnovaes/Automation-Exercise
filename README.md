# Projeto de Automação de Testes — Cypress + Cucumber (BDD)

## 🔗 **Relatório Allure (GitHub Pages)**

**Acesse o relatório online:**
[https://leonardolnovaes.github.io/Automation-Exercise/](https://leonardolnovaes.github.io/Automation-Exercise/)

> Publicado a partir do conteúdo de `allure-report/` no branch `gh-pages`.

---

Automação **Web e API** usando **Cypress**, **Cucumber (BDD)** e **JavaScript**.

## Stack

* **Cypress** (E2E)
* **Cucumber** via `@badeball/cypress-cucumber-preprocessor`
* **esbuild** (pré-processador)
* **Allure** (`@shelex/cypress-allure-plugin` + `allure-commandline`) — relatórios

> `baseUrl`: `https://www.automationexercise.com`.

---

## Pré-requisitos

* Node.js 18+
* (Para abrir o relatório Allure localmente) **Java 8+**

---

## Instalação

```bash
git clone https://github.com/leonardolnovaes/Automation-Exercise.git
cd Automation-Exercise
npm install
```

### Credenciais para cenários logados

Crie `cypress.env.json` (não versionado):

```json
{
  "USER_EMAIL": "testeqa@mailinator.com",
  "USER_PASSWORD": "Teste123!"
}
```

---

## Como executar

### Interativo (GUI)

```bash
npm run cy:open
```

### Headless

```bash
npm run cy:run
```

### Por arquivo `.feature`

```bash
npx cypress run --spec cypress/e2e/web/login.feature
```

> Hooks úteis: `@needsAuth` (sessão logada) e `@withItem` (carrinho com 1 item).

---

## Relatórios (Allure)

### Local

1. Execute os testes (gera `./allure-results`):

```bash
npm run cy:run
```

2. Gere e abra o relatório:

```bash
npm run allure:generate
npm run allure:open
```

Pastas:

* `allure-results/` → resultados brutos
* `allure-report/`  → HTML do relatório

### Online (opcional)

* O conteúdo de `allure-report/` pode ser publicado no **GitHub Pages**.
  URL pública: **[https://leonardolnovaes.github.io/Automation-Exercise/](https://leonardolnovaes.github.io/Automation-Exercise/)**

---

## Escopo

**Web**: Login, Busca de produtos, Carrinho (visualização, checkout autenticado e remoção).
**API**: Trello (GET ação fixa), valida `status 200` e log de `data.list.name`; cenário negativo (400/404).

---
