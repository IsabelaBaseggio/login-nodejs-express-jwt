const routes = require("express").Router();
const { Router } = require("express");
const UserController = require("../controllers/UserController");

routes.get("/register", UserController.registerPage);

routes.post("/register", UserController.registerUser);

routes.get("/", UserController.mainUser);

routes.get('/login', UserController.loginPage);

module.exports = routes;