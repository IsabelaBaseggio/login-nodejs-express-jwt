# Login System

[README(english)](https://github.com/IsabelaBaseggio/login-nodejs-express-jwt/blob/main/README.md)

#### Status: Done

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
  <img src="https://github.com/IsabelaBaseggio/login-nodejs-express-jwt/blob/main/assets/loginSystemMobile.png" alt="login system home mobile"      style="width:24%;"/>
 </p>

### Layout web

<p float="left">
  <img src="https://github.com/IsabelaBaseggio/login-nodejs-express-jwt/blob/main/assets/loginSystemWeb.png" alt="login system home web" style="width:49%;"/>
 </p>

## Prerequisites

You will need to have the following tools installed on your machine:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/);

And an editor to work with the code, such as: [VSCode](https://code.visualstudio.com/).

```bash

# Clone this repository
$ git clone <https://github.com/IsabelaBaseggio/login-nodejs-express-jwt>

# In the text editor, open the index.js file and change the port variable to:
const port = 3000;

# Access the project folder in the terminal/cmd
$ cd login-nodejs-express-jwt

# Go to the index file
$ cd index

# Install the dependencies
$ npm install bcryptjs@2.4.3 connect-flash@0.1.1 dotenv@16.0.3 ejs@3.1.8 express@4.18.2 express-session@1.17.3 jsonwebtoken@9.0.0 mongoose@6.7.3 nodemailer@6.8.0 passport@0.6.0 passport-local@1.0.0

# Run the application in development mode
$ npm run dev:server

# The server will start on port: 3000 - access <http://localhost:3000>

```

## Techniques and technology used

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


## Author

Isabela Ribeiro Baseggio

https://www.linkedin.com/in/isabelabaseggio
