const Product = require("../models/Products");
const Category = require("../models/Categorys");
const { mutipleMongooseToObject } = require("../../util/mongoose");

class HomeController {
  index(req, res, next) {
    res.locals.fullname;
    let product = Product.find({});
    let category = Category.find({});
    Promise.all([category, product])
      .then(([category, product]) => {
        res.render("home", {
          category: mutipleMongooseToObject(category),

          product: mutipleMongooseToObject(product),
        });
      })
      .catch(next);
  }
}
module.exports = new HomeController();
