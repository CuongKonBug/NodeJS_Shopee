const express = require("express");
const router = express.Router();
const meController = require("../app/controllers/MeController");

router.get("/stored/products", meController.show);
router.get("/trash/products", meController.trash);

module.exports = router;
