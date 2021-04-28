const Product = require("../models/Products");
const { mutipleMongooseToObject } = require("../../util/mongoose");
const { mongooseToObject } = require("../../util/mongoose");

class MeController {
  show(req, res, next) {
    // res.json(res.locals._sort);
    let productQuery = Product.find({});
    //Kiểm tra xem có ycau sort trên URL
    if (req.query.hasOwnProperty("_sort")) {
      productQuery = productQuery.sort({
        [req.query.column]: req.query.type,
      });
    }

    Promise.all([productQuery, Product.countDocumentsDeleted()])
      .then(([product, countdeleted]) => {
        res.render("me/stored-products", {
          countdeleted,
          product: mutipleMongooseToObject(product),
        });
      })
      .catch(next);
  }

  trash(req, res, next) {
    Product.findDeleted({})
      .then((product) =>
        res.render("me/trash-products", {
          product: mutipleMongooseToObject(product),
        })
      )
      .catch(next);
  }
}
module.exports = new MeController();
