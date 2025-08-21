const {
  Before,
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");

Given("que já tenho um item no carrinho", () => {
  // Garantia extra: valida que o seed funcionou
  cy.visit("/view_cart");
  cy.get(".cart_description", { timeout: 15000 }).should("exist");
});

When("acesso a página do carrinho", () => {
  cy.visit("/view_cart");
  cy.url().should("include", "/view_cart");
});

Then("devo ver um item listado", () => {
  cy.get(".cart_description").should("be.visible");
});

When("avanço para o checkout", () => {
  cy.contains("Proceed To Checkout", { timeout: 15000 }).click({ force: true });
});

Then("devo continuar autenticado", () => {
  // Alguns fluxos mostram “Logged in as”; outros já exibem o resumo do pedido
  cy.url().then((url) => {
    const onCheckout = url.includes("/checkout");
    if (onCheckout) {
      cy.contains("Address Details").should("be.visible"); // ajuste se necessário
    } else {
      cy.contains("Logged in as", { matchCase: false }).should("be.visible");
    }
  });
});

Then("a quantidade deve ser {string}", (qtd) => {
  cy.get("tr.cart_item")
    .first()
    .within(() => {
      cy.get(".cart_quantity_input, .disabled")
        .invoke("val")
        .then((val) => {
          if (val) {
            expect(String(val)).to.eq(qtd);
          } else {
            cy.get(".cart_quantity").should("contain.text", qtd);
          }
        });
    });
});

When("removo todos os itens do carrinho", () => {
  cy.get(".cart_quantity_delete, .cart_delete a").each(($el) => {
    cy.wrap($el).click({ force: true });
  });
});


Then("o carrinho deve estar vazio", () => {
  cy.get("body").then(($b) => {
    if ($b.text().includes("Cart is empty")) {
      cy.contains("Cart is empty").should("be.visible");
    } else {
      cy.get(".cart_info").within(() => {
        cy.get("tr.cart_item").should("have.length", 0);
      });
    }
  });
});
