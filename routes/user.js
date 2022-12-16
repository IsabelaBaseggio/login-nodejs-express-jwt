const routes = require("express").Router();
const UserController = require("../controllers/UserController");

routes.get("/register", UserController.registerPage);

routes.post("/register", UserController.registerUser);

module.exports = routes;