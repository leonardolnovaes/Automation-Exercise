// cypress/e2e/steps/cart.steps.js
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { CartSelectors as SEL } from "../../support/selectors";

When("acesso a página do carrinho", () => {
  cy.visit("/view_cart");
  cy.contains(/Shopping Cart/i, { timeout: 10000 }).should("be.visible");
  cy.get(SEL.container, { timeout: 10000 }).should("be.visible");
});

Then("devo ver um item listado", () => {
  cy.get(`${SEL.itemRow}, ${SEL.itemDescription}`, { timeout: 10000 }).should(
    "exist"
  );
});

When("avanço para o checkout", () => {
  cy.get(SEL.checkoutBtn, { timeout: 15000 }).should("be.visible").click();
});

Then("devo continuar autenticado", () => {
  cy.url().then((url) => {
    if (url.includes("/login")) {
      throw new Error("Redirecionado para /login — sessão não mantida.");
    }
  });
  // Em fluxo normal, cai em /checkout e mostra detalhes do endereço/pedido
  cy.contains(/Address Details|Review Your Order/i, { timeout: 15000 }).should(
    "be.visible"
  );
});

Then("a quantidade deve ser {string}", (qtd) => {
  cy.get(SEL.itemRow)
    .first()
    .within(() => {
      // alguns temas usam input desabilitado, outros só texto
      cy.get(".cart_quantity_input, .disabled, .cart_quantity")
        .first()
        .invoke("text")
        .then((t) => t && t.trim())
        .then((text) => {
          if (text) {
            expect(text).to.contain(qtd);
          } else {
            cy.get(".cart_quantity_input, .disabled")
              .invoke("val")
              .then((val) => expect(String(val)).to.eq(qtd));
          }
        });
    });
});

When("removo todos os itens do carrinho", () => {
  cy.get(SEL.removeBtn).each(($el) => {
    cy.wrap($el).click({ force: true });
  });
});

Then("o carrinho deve estar vazio", () => {
  // aceita tanto mensagem quanto ausência de linhas
  cy.get("body").then(($b) => {
    if ($b.text().match(/Cart is empty/i)) {
      cy.contains(/Cart is empty/i).should("be.visible");
    } else {
      cy.get("tr.cart_item").should("not.exist");
    }
  });
});
