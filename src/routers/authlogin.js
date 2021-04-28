const express = require("express");
const router = express.Router();
const authloginController = require("../app/controllers/AuthLoginController");
const authRequire = require("../app/middelwares/AuthMiddleware");
router.get("/create_account", authloginController.formcreate);
router.post("/account", authloginController.create);
router.get("/deleteCookie", authloginController.logout);

router.post("/login", authloginController.connect);
router.get("/", authloginController.login);

module.exports = router;
