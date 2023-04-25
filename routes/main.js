const routes = require("express").Router();
const MainController = require("../controllers/MainController");
const passport = require('passport');

routes.get("/", MainController.mainIndex);
routes.get("/register", MainController.registerPage);
routes.get('/login', MainController.loginPage);
routes.get('/reset', MainController.resetPasswordPage);
routes.get('/reset/:id/:token', MainController.resetLinkPage);

routes.post("/register", MainController.registerUser);
routes.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true,
}), MainController.loginUser);
routes.post('/reset', MainController.createLinkResetPassword);
routes.post('/reset/:id/:token', MainController.resetingPassword);

module.exports = routes;