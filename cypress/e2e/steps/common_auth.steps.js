const { Given, Before } = require("@badeball/cypress-cucumber-preprocessor");

// (opcional) login só quando o cenário tiver @needsAuth
// Só loga quando o cenário tiver @needsAuth
Before({ tags: "@needsAuth" }, () => {
  cy.ensureLoggedIn();
});

// Só semeia item quando tiver @withItem
Before({ tags: "@withItem" }, () => {
  cy.ensureCartSeeded();
});

Given("que estou autenticado", () => {
  // garante na UI que de fato está logado
  cy.visit("/");
  cy.contains("Logged in as", { matchCase: false, timeout: 15000 }).should("be.visible");
});
