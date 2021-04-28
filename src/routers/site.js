const express = require("express");
const router = express.Router();
const homeController = require("../app/controllers/HomeController");
const authRequire = require("../app/middelwares/AuthMiddleware");

router.get("/", homeController.index);
module.exports = router;
