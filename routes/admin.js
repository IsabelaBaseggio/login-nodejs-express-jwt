const routes = require("express").Router();
const AdminController = require("../controllers/AdminController");
const authToken = require("../controllers/AuthTokenController");
const authAdmin = require("../controllers/AuthAdminController");

routes.get("/:admin", authToken, authAdmin, AdminController.mainAdmin);
routes.get("/:admin/settings", authToken, authAdmin, AdminController.settingsPage);
routes.get("/:admin/logout", authToken, authAdmin, AdminController.logoutConfirm);
routes.get("/:admin/deleteUserConfirm/:id", authToken, authAdmin, AdminController.deleteUserConfirm);
routes.get("/:admin/:id/deleteUserAccount", authToken, authAdmin, AdminController.deleteUserAccount);

routes.post("/:admin/deleteConfirm", authToken, authAdmin, AdminController.deleteConfirm);

module.exports = routes;