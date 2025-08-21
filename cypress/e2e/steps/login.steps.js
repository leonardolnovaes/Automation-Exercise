// cypress/e2e/steps/login.steps.js
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const SEL = {
  email: "[data-qa='login-email']",
  password: "[data-qa='login-password']",
  submit: "[data-qa='login-button']",
};

Given("que acesso a página de login", () => {
  cy.visit("/login");
  cy.contains("Login to your account").should("be.visible");
});

When("informo o email {string} e a senha {string}", (email, senha) => {
  cy.get(SEL.email).clear().type(email);
  cy.get(SEL.password).clear().type(senha, { log: false });
});

When("envio o formulário", () => {
  cy.get(SEL.submit).click();
});

Then("devo ver o nome do usuario {string} logado", (text) => {
  cy.get("b").should("be.visible").and("have.text", text)
});

Then("devo ver a mensagem de erro de credenciais {string}", (text) => {
  cy.get(".login-form > form > p").should("be.visible").and("have.text", text)
})
