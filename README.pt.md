# Login System

[README(english)](https://github.com/IsabelaBaseggio/login-nodejs-express-jwt/blob/main/README.md)

#### Status: Finalizado

[![GitHub](https://img.shields.io/github/license/IsabelaBaseggio/login-nodejs-express-jwt)](https://github.com/IsabelaBaseggio/login-nodejs-express-jwt/blob/main/LICENSE)


## Sobre o projeto

https://login-system-1efk.onrender.com/

Login System é um software criado com o objetivo de praticar a autenticação de usuários, padrão de projeto MVC, CRUD, persistência de dados no banco de dados relacional, estilização interativa e layout responsivo.

O software consiste em um sistema de login, com a interação de cadastro, login, logout, alteração de dados, exclusão de conta e recuperação de senha.

### Funcionalidades


Todos os tipos de usuários: `/user` `/admin`

- `Funcionalidade 1`: Realizar cadastro de usuário.
- `Funcionalidade 2`: Realizar autenticação do usuário / login.
- `Funcionalidade 3`: Atualizar dados da conta de usuário.
- `Funcionalidade 4`: Excluir conta de usuário.
- `Funcionalidade 5`: Encerrar sessão do usuário / logout.
- `Funcionalidade 6`: Recuperar senha da conta de usuário.

Usuário do tipo Administrador: `/admin`

- `Funcionalidade 7`: Excluir contas de usuários cadastrados no sistema.

### Layout mobile

<p float="left">
  <img src="https://github.com/IsabelaBaseggio/login-nodejs-express-jwt/blob/main/assets/loginSystemMobile.png" alt="login system home mobile"      style="width:24%;"/>
   </p>

### Layout web

<p float="left">
  <img src="https://github.com/IsabelaBaseggio/login-nodejs-express-jwt/blob/main/assets/loginSystemWeb.png" alt="login system home web" style="width:49%;"/>
 </p>

## Pré-requisitos

Você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/);

E um editor para trabalhar com o código, como: [VSCode](https://code.visualstudio.com/).

```bash

# Clone este repositório
$ git clone <https://github.com/IsabelaBaseggio/login-nodejs-express-jwt>

# No editor de texto abra o arquivo index.js e altere a variável port para:
const port = 3000;

# Acesse a pasta do projeto no terminal/cmd
$ cd login-nodejs-express-jwt

# Vá para o arquivo index
$ cd index

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev:server

# O servidor iniciará na porta: 3000 - acesse <http://localhost:3000>

```

## Técnicas e tecnologia utilizadas

- Padrão MVC

### Front end
- HTML5 / CSS3
- JavaScript v8
- Material Icons - Google Fonts

### Back end
- Node.js v8.11.0
- Express v4.18.2
- Express-session v1.17.3
- MongoDB v6.7.3
- Dotenv v16.0.3
- EJS v3.1.8
- Bcryptjs v2.4.3
- Connect-flash v0.1.1
- JSON Web Token v9.0.0
- Nodemailer v6.8.0
- Passport v0.6.0
- Passport-local v1.0.0


## Autor

Isabela Ribeiro Baseggio

https://www.linkedin.com/in/isabelabaseggio

