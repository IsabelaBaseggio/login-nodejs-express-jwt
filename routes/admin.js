const routes = require("express").Router();
const { Router } = require("express");
const AdminController = require("../controllers/AdminController");
const authToken = require("../controllers/AuthTokenController");
const authAdmin = require("../controllers/AuthAdminController");

routes.get("/:admin", authToken, authAdmin, AdminController.mainAdmin);

routes.get("/:admin/settings", authToken, authAdmin, AdminController.settingsPage);

routes.get("/:admin/deleteConfirm", authToken, authAdmin, AdminController.deleteConfirm);

routes.get("/:admin/logout", authToken, authAdmin, AdminController.logoutConfirm);

module.exports = routes;