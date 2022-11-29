const router = require("express").Router();
const MainController = require("../controllers/MainController")

router.get("/", MainController.mainIndex);

module.exports = router;