# language: pt
Funcionalidade: Carrinho (com item semeado)
Como usuário autenticado
Quero buscar produtos
Para encontrar itens rapidamente

@withItem
Cenário: Validar item no carrinho
Quando acesso a página do carrinho
Então devo ver um item listado
@withItem
Cenário: Prosseguir para checkout estando logado
Quando acesso a página do carrinho
E avanço para o checkout
Então devo continuar autenticado
@withItem
Cenário: Remover item do carrinho
Quando acesso a página do carrinho
E removo o item
Então o carrinho deve estar vazio
