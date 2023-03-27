const routes = require("express").Router();
const MainController = require("../controllers/MainController");
const passport = require('passport');

routes.get("/", MainController.mainIndex);

routes.get("/register", MainController.registerPage);

routes.post("/register", MainController.registerUser);

routes.get('/login', MainController.loginPage);

routes.post('/login', passport.authenticate('local', {
    failureRedirect: 'main/login',
    failureFlash: true,
}), MainController.loginUser);

routes.get('/reset', MainController.resetPasswordPage);

routes.post('/reset', MainController.createLinkResetPassword);

routes.get('/reset/:id/:token', MainController.resetLinkPage);

routes.post('/reset/:id/:token', MainController.resetingPassword);

module.exports = routes;