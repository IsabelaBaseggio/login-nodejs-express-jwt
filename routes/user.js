const routes = require("express").Router();
const { Router } = require("express");
const UserController = require("../controllers/UserController");

routes.get("/", UserController.mainUser);

routes.get("/settings", UserController.settingsPage);

module.exports = routes;