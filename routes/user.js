const routes = require("express").Router();
const { Router } = require("express");
const UserController = require("../controllers/UserController");

routes.get("/register", UserController.pagesRegister);

routes.post("/register", UserController.registerUser);

routes.get("/main", UserController.mainUser);

module.exports = routes;