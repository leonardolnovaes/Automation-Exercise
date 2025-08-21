import { Given, Before } from "@badeball/cypress-cucumber-preprocessor";

Before({ tags: "@needsAuth" }, () => {
  cy.ensureLoggedIn();
  cy.visit("/"); // garante página carregada pós-restauração
});

Before({ tags: "@withItem" }, () => {
  cy.ensureCartSeeded();
  cy.visit("/"); // garante página carregada pós-restauraçã
});

Given("que estou autenticado", () => {
  cy.contains(/Logged in as/i).then(($el) => {
    if (!$el.length) cy.visit("/");
  });
  cy.contains(/Logged in as/i, { timeout: 15000 }).should("be.visible");
});
