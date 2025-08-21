const { When, Then } = require("@badeball/cypress-cucumber-preprocessor");

let response;

// Cenário principal (ID fixo do enunciado)
When("eu envio um GET para a ação do Trello", () => {
  cy.request({
    method: "GET",
    url: "https://api.trello.com/1/actions/592f11060f95a3d3d46a987a",
    failOnStatusCode: false, // deixamos nós validarmos o status
  }).then((res) => {
    response = res;
  });
});

Then("o status deve ser {int}", (statusCode) => {
  expect(response, "resposta deve existir").to.exist;
  expect(response.status, "status HTTP").to.eq(statusCode);
});

Then('devo exibir o campo "list.name" no log', () => {
  // Em ações do Trello, o caminho comum é body.data.list.name
  const listName = response?.body?.data?.list?.name;

  // Garante que existe e é string
  expect(listName, "data.list.name").to.be.a("string").and.not.be.empty;

  // Exibe no log do Cypress
  cy.log(`list.name: ${listName}`);
  // (Opcional) também imprime no console do runner
  // eslint-disable-next-line no-console
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
  expect([400, 404], "status esperado para ID inválido").to.include(response.status);
});