# language: pt
Funcionalidade: API Trello

  @api @trello
  Cenário: Obter ação e validar list.name
    Quando eu envio um GET para a ação do Trello
    Então o status deve ser 200
    E devo exibir o campo "list.name" no log

  @api @trello @negativo
  Cenário: ID inválido retorna erro
    Quando eu envio um GET para a ação do Trello com id "aaaaaaaaaaaaaaaaaaaaaaaa"
    Então o status deve ser 400 ou 404
