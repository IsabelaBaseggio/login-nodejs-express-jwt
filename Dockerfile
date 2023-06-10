# This Dockerfile was created by Isabela
FROM node:8

RUN npm install bcryptjs@2.4.3 connect-flash@0.1.1 dotenv@16.0.3 ejs@3.1.8 express@4.18.2 express-session@1.17.3 jsonwebtoken@9.0.0 mongoose@6.7.3 nodemailer@6.8.0 passport@0.6.0 passport-local@1.0.0

WORKDIR /login-nodejs-express-jwt

COPY . .

ENV PORT = "https://loginnodejsexpressjwt-isabelabaseggio7.b4a.run/"

CMD ["node", "index.js"]

EXPOSE 8080