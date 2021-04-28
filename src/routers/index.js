const siteRouter = require("./site");
const productRouter = require("./products");
const meRouter = require("./me");
const athuloginRouter = require("./authlogin");

function router(app) {
  app.use("/me", meRouter);
  app.use("/auth", athuloginRouter);

  app.use("/store", productRouter);
  app.use("/create", productRouter);
  app.use("/products", productRouter);
  app.use("/", siteRouter);
}

module.exports = router;
