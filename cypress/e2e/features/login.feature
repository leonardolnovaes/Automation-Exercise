
Funcionalidade: Login
Para acessar a plataforma
Como usuário registrado
Eu quero realizar login

@positivo
Cenário: Login válido
Dado que acesso a página de login
Quando informo o email "qateste@mailinator.com" e a senha "Teste123!"
E envio o formulário
Então devo ver o nome do usuario "Teste QA" logado

@negativo
Cenário: Login inválido
Dado que acesso a página de login
Quando informo o email "invalido@teste.com" e a senha "123456"
E envio o formulário
Então devo ver a mensagem de erro de credenciais "Your email or password is incorrect!"
