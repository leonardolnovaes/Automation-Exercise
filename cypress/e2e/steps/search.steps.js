const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");

Given("que estou na página inicial e clico em Products", () => {
  cy.get("[href='/products']").click().url().should("include", "/products");
});

When("pesquiso por {string}", (termo) => {
  cy.get("#search_product").clear().type(termo);
  cy.get("#submit_search").click();
});

Then("clico no primeiro resultado e adiciono ao carrinho", () => {
  cy.get(".product-image-wrapper", { timeout: 10000 })
    .first()
    .within(() => {
      cy.contains("Add to cart").click();
    });

  cy.contains("Added!").should("be.visible");
});
