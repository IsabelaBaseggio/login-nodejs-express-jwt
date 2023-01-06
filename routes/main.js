const routes = require("express").Router();
const MainController = require("../controllers/MainController")

routes.get("/", MainController.mainIndex);

routes.get('/reset', MainController.resetPage);

routes.post('/reset', MainController.resetPassword);

module.exports = routes;