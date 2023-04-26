# Login System

[README(english)](https://github.com/IsabelaBaseggio/login-nodejs-express-jwt/blob/main/README.md)

#### Status: Finalizado

[![GitHub](https://img.shields.io/github/license/IsabelaBaseggio/login-nodejs-express-jwt)](https://github.com/IsabelaBaseggio/login-nodejs-express-jwt/blob/main/LICENSE)


## Project Description

https://login-nodejs-express-jwt-production.up.railway.app/

Login System is a software created with the goal of practicing user authentication, MVC design pattern, CRUD, relational database persistence, interactive styling, and responsive layout.

The software consists of a login system with the interaction of user registration, login, logout, data update, account deletion, and password recovery.

### Functionalities


All user types:

- `Functionality 1`: Register user.
- `Functionality 2`: Authenticate user / login.
- `Functionality 3`: Update user account information.
- `Functionality 4`: Delete user account.
- `Functionality 5`: End user session / logout.
- `Functionality 6`: Recover user account password.

Administrator user:

- `Functionality 7`: Delete registered user accounts in the system.

### Layout mobile

<p float="left">
  <img src="" alt="to do list home mobile"      style="width:24%;"/>
  <img src="" alt="add task mobile"        style="width:24%;"/>
  <img src="" alt="update task mobile" style="width:24%;"/>
  <img src="" alt="updating task mobile" style="width:24%;"/>
  <img src="" alt="task updated mobile"      style="width:24%;"/>
  <img src="" alt="task checked mobile"        style="width:24%;"/>
  <img src="" alt="confirming delete task mobile" style="width:24%;"/>
  <img src="" alt="task deleted mobile" style="width:24%;"/>
  
 </p>

### Layout web

<p float="left">
  <img src="" alt="to do list home web" style="width:49%;"/>
  <img src="" alt="add task web" style="width:49%;"/>
  <img src="" alt="update task web" style="width:49%;"/>
  <img src="" alt="updating task web" style="width:49%;"/>
  <img src="" alt="task updated web" style="width:49%;"/>
  <img src="" alt="task checked web" style="width:49%;"/>
  <img src="" alt="confirming delete task web" style="width:49%;"/>
  <img src="" alt="task deleted web" style="width:49%;"/>
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
$ npm install bcryptjs@2.4.3 connect-flash@0.1.1 dotenv@16.0.3 ejs@3.1.8 express@4.18.2 express-session@1.17.3 jsonwebtoken@9.0.0 mongoose@6.7.3 nodemailer@6.8.0 passport@0.6.0 passport-local@1.0.0

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
