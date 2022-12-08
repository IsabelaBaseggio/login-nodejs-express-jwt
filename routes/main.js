const router = require("express").Router();
const MainController = require("../controllers/MainController")

router.get("/", MainController.mainIndex);

router.get("/register", MainController.mainRegister);

module.exports = router;