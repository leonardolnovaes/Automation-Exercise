// cypress/e2e/steps/trello.steps.js
const { When, Then } = require("@badeball/cypress-cucumber-preprocessor");

let response;

// Cenário principal (ID fixo do enunciado)
When("eu envio um GET para a ação do Trello", () => {
  cy.request({
    method: "GET",
    url: "https://api.trello.com/1/actions/592f11060f95a3d3d46a987a",
    failOnStatusCode: false, // não falha automático
  }).then((res) => {
    response = res;
  });
});

Then("o status deve ser {int}", (statusCode) => {
  expect(response).to.exist;
  expect(response.status).to.eq(statusCode);
});

Then('devo exibir o campo "list.name" no log', () => {
  const listName = response?.body?.data?.list?.name;
  expect(listName).to.be.a("string").and.not.be.empty;

  cy.log(`list.name: ${listName}`);
  console.log("list.name:", listName);
});

// Cenário negativo com ID parametrizado
When("eu envio um GET para a ação do Trello com id {string}", (id) => {
  cy.request({
    method: "GET",
    url: `https://api.trello.com/1/actions/${id}`,
    failOnStatusCode: false,
  }).then((res) => {
    response = res;
  });
});

Then("o status deve ser 400 ou 404", () => {
  expect([400, 404]).to.include(response.status);
});
