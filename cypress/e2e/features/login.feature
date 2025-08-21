# language: pt

Funcionalidade: Login
  Para acessar a plataforma
  Como usuário registrado
  Eu quero realizar login

  Contexto: Estou na tela de login
    Dado que acesso a página de login

  Cenário: Login válido
    Quando informo o email "testeqa@mailinator.com" e a senha "Teste123!"
    E envio o formulário
    Então devo ver o nome do usuario "Teste QA" logado

  Cenário: Login inválido
    Quando informo o email "invalido@teste.com" e a senha "123456"
    E envio o formulário
    Então devo ver a mensagem de erro de credenciais "Your email or password is incorrect!"
