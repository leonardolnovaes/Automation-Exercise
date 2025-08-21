// Credenciais vêm de cypress.env.json ou --env
function getCreds() {
  const email = Cypress.env("USER_EMAIL");
  const password = Cypress.env("USER_PASSWORD");
  if (!email || !password)
    throw new Error(
      "Defina USER_EMAIL e USER_PASSWORD (cypress.env.json ou --env)."
    );
  return { email, password };
}

// Login UI com assert
Cypress.Commands.add("uiLoginOnce", (email, password) => {
  cy.visit("/login");
  cy.contains("Login to your account", { timeout: 15000 }).should("be.visible");
  cy.get("[data-qa='login-email']").clear().type(email);
  cy.get("[data-qa='login-password']").clear().type(password, { log: false });
  cy.get("[data-qa='login-button']").click();
  cy.contains("Logged in as", { matchCase: false, timeout: 15000 }).should(
    "be.visible"
  );
});

// Garante sessão logada (reusa com cy.session)
Cypress.Commands.add("ensureLoggedIn", (emailArg, passwordArg) => {
  const { email, password } =
    emailArg && passwordArg
      ? { email: emailArg, password: passwordArg }
      : getCreds();
  cy.session(["ui-login", email], () => cy.uiLoginOnce(email, password), {
    validate() {
      cy.visit("/");
      cy.contains("Logged in as", { matchCase: false, timeout: 15000 }).should(
        "be.visible"
      );
    },
  });
});

// Adiciona o primeiro produto da lista ao carrinho (UI)
Cypress.Commands.add("addFirstProductToCartUI", () => {
  cy.visit("/products");
  cy.contains("All Products", { timeout: 15000 }).should("be.visible");
  // Alguns temas mostram o botão só no hover — forçamos o clique
  cy.get(".product-image-wrapper")
    .first()
    .within(() => {
      cy.contains("Add to cart").click({ force: true });
    });
  // Modal de confirmação → seguimos comprando para só semear
  cy.contains("Continue Shopping", { timeout: 10000 }).click({ force: true });
});

// Garante que já existe item no carrinho (reusa com cy.session)
Cypress.Commands.add("ensureCartSeeded", () => {
  const key = ["cart-seed", Cypress.env("USER_EMAIL") || "guest"];
  cy.session(
    key,
    () => {
      // pré-requisito: estar logado ajuda a manter o carrinho na conta
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
