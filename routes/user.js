const routes = require("express").Router();
const { Router } = require("express");
const UserController = require("../controllers/UserController");

routes.get("/:user", UserController.mainUser);

routes.get("/:user/settings", UserController.settingsPage);

module.exports = routes;