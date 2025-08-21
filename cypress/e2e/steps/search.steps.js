// steps/search.steps.js
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
const { SearchSelectors: SEL } = require("../../support/selectors");

Given("que estou na página inicial e clico em Products", () => {
  cy.contains(SEL.productsLink, "Products").click();
  cy.contains("All Products", { timeout: 10000 }).should("be.visible");
});

When("pesquiso por {string}", (termo) => {
  cy.get(SEL.searchInput).clear().type(termo);
  cy.get(SEL.searchButton).click();
  cy.contains(/Searched Products/i, { timeout: 10000 }).should("be.visible");
});

Then("clico no primeiro resultado e adiciono ao carrinho", () => {
  cy.get(SEL.productWrapper, { timeout: 10000 })
    .first()
    .within(() => {
      cy.contains(/Add to cart/i).click();
    });

  // Modal aparece após adicionar
  cy.contains(/Added|Product added/i, { timeout: 10000 }).should("be.visible");
  cy.contains(/Continue Shopping/i, { timeout: 10000 }).click();
  cy.get(SEL.searchInput).should("be.visible");
});
