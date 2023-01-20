const routes = require("express").Router();
const MainController = require("../controllers/MainController")

routes.get("/", MainController.mainIndex);

routes.get("/register", MainController.registerPage);

routes.post("/register", MainController.registerUser);

routes.get('/login', MainController.loginPage);

routes.post('/login', MainController.loginUser);

routes.get('/reset', MainController.resetPasswordPage);

routes.post('/reset', MainController.createLinkResetPassword);

routes.get('/reset/:id/:token', MainController.resetLinkPage);

routes.post('/reset/:id/:token', MainController.resetingPassword);

module.exports = routes;