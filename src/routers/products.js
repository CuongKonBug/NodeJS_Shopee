const express = require("express");
const router = express.Router();
const productController = require("../app/controllers/ProductsController");
const authRequire = require("../app/middelwares/AuthMiddleware");

router.get("/create", authRequire.auth, productController.create);
router.post("/store", authRequire.auth, productController.store);
router.get("/:id/edit", productController.edit);
router.put("/:id", productController.update);
router.delete("/:id", productController.destroy);
router.patch("/:id/restore", productController.restore);
router.delete("/:id/force", productController.destroyForce);
router.post("/handle-form-action", productController.handleFormAction);

router.get("/:slug", productController.show);

module.exports = router;
