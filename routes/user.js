const routes = require("express").Router();
const { Router } = require("express");
const UserController = require("../controllers/UserController");
const auth = require("../controllers/AuthTokenController");

routes.get("/:user", auth, UserController.mainUser);

routes.get("/:user/settings", auth, UserController.settingsPage);

routes.post("/:user/update", auth, UserController.updatingUser);

routes.post("/:user/deleteConfirm", auth, UserController.deleteConfirm);

routes.get("/:user/:id/deleteAccount", auth, UserController.deleteAccount);

routes.get("/:user/logout", auth, UserController.logoutConfirm);

routes.get("/:user/logoutAccount", auth, UserController.logoutAccount);

module.exports = routes;