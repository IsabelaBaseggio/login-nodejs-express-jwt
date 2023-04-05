const routes = require("express").Router();
const { Router } = require("express");
const AdminController = require("../controllers/AdminController");
const auth = require("../controllers/AuthTokenController");

routes.get("/:admin", auth, AdminController.mainAdmin);

routes.get("/:admin/settings", auth, AdminController.settingsPage);

module.exports = routes;