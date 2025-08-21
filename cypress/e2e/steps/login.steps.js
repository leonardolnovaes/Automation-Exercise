// cypress/e2e/steps/login.steps.js
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
const { LoginSelectors: SEL } = require("../../support/selectors")

Given("que acesso a página de login", () => {
  cy.visit("/login");
  cy.contains("Login to your account", { timeout: 10000 }).should("be.visible");
});

When("informo o email {string} e a senha {string}", (email, senha) => {
  cy.get(SEL.email).clear().type(email);
  cy.get(SEL.password).clear().type(senha, { log: false });
});

When("envio o formulário", () => {
  cy.get(SEL.submit).click();
});

Then("devo ver o nome do usuario {string} logado", (nome) => {
  // Garante que a âncora de "Logged in as" aparece
  cy.contains(SEL.loggedInAs, "Logged in as", { matchCase: false, timeout: 10000 })
    .should("be.visible")
    // Dentro desse elemento, o nome vem em <b> normalmente
    .find("b")
    .invoke("text")
    .then((txt) => txt.trim())
    .should("eq", nome);
});

Then("devo ver a mensagem de erro de credenciais {string}", (mensagem) => {
  // Ancora pelo form de login e valida o texto exibido
  cy.get(`${SEL.loginForm} form`)
    .should("be.visible")
    .within(() => {
      cy.contains("p", mensagem).should("be.visible");
    });
});
