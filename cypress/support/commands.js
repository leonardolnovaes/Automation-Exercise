// cypress/support/commands.js

// Utilitário simples para pegar credenciais
function getCreds() {
  const email = Cypress.env("USER_EMAIL");
  const password = Cypress.env("USER_PASSWORD");
  if (!email || !password) {
    throw new Error(
      "Defina USER_EMAIL e USER_PASSWORD em cypress.env.json ou --env"
    );
  }
  return { email, password };
}

// Login normal (uma vez)
Cypress.Commands.add("uiLoginOnce", (email, password) => {
  cy.visit("/login");
  cy.contains("Login to your account").should("be.visible");
  cy.get("[data-qa='login-email']").clear().type(email);
  cy.get("[data-qa='login-password']").clear().type(password, { log: false });
  cy.get("[data-qa='login-button']").click();
  cy.contains("Logged in as").should("be.visible");
});

// Login reaproveitando sessão (Cypress v12+)
Cypress.Commands.add("ensureLoggedIn", () => {
  const { email, password } = getCreds();
  cy.session([email], () => {
    cy.uiLoginOnce(email, password);
  });
});

// Adiciona o primeiro produto ao carrinho
Cypress.Commands.add("addFirstProductToCartUI", () => {
  cy.visit("/products");
  cy.contains("All Products", { timeout: 15000 }).should("be.visible");
  cy.get(".product-image-wrapper")
    .first()
    .within(() => {
      cy.contains("Add to cart").click({ force: true });
    });
  cy.contains("Continue Shopping", { timeout: 10000 }).click({ force: true });
});

Cypress.Commands.add("ensureCartSeeded", () => {
  const key = ["cart-seed", Cypress.env("USER_EMAIL") || "guest"];
  cy.session(
    key,
    () => {
      const creds = getCreds();
      cy.uiLoginOnce(creds.email, creds.password);
      cy.addFirstProductToCartUI();
    },
    {
      validate() {
        cy.visit("/view_cart");
        cy.get(".cart_description", { timeout: 15000 }).should("exist");
      },
    }
  );
});
