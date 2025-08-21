const { Given, Before } = require("@badeball/cypress-cucumber-preprocessor");


Before({ tags: "@needsAuth" }, () => {
  cy.ensureLoggedIn();
});

Before({ tags: "@withItem" }, () => {
  cy.ensureCartSeeded();
});

Given("que estou autenticado", () => {
  cy.visit("/");
  cy.contains("Logged in as", { matchCase: false, timeout: 15000 }).should("be.visible");
});
