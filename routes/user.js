const routes = require("express").Router();
const { Router } = require("express");
const UserController = require("../controllers/UserController");
const auth = require("../controllers/AuthController");

routes.get("/:user", auth, UserController.mainUser);

routes.get("/:user/settings", auth, UserController.settingsPage);

routes.post("/:user/settings", auth, UserController.updatingUser);

module.exports = routes;