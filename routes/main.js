const routes = require("express").Router();
const MainController = require("../controllers/MainController")

routes.get("/", MainController.mainIndex);

module.exports = routes;