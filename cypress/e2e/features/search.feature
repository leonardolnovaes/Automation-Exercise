# language: pt
Funcionalidade: Busca (logado)
Como usuário autenticado
Quero buscar produtos
Para encontrar itens rapidamente

@needsAuth
Cenário: Buscar por um produto existente (logado)
Dado que estou autenticado
Dado que estou na página inicial e clico em Products
Quando pesquiso por "dress"
Então clico no primeiro resultado e adiciono ao carrinho