const Product = require("../models/Products");
const { mutipleMongooseToObject } = require("../../util/mongoose");
const { mongooseToObject } = require("../../util/mongoose");

class ProductsController {
  show(req, res, next) {
    Product.findOne({ slug: req.params.slug })
      .then((product) => {
        res.render("products/show", { product: mongooseToObject(product) });
      })
      .catch(next);
  }
  create(req, res, next) {
    res.render("products/create");
    // console.log(res.locals.email);
  }
  store(req, res, next) {
    const product = new Product(req.body);
    product
      .save()
      .then(() => res.redirect("/"))
      .catch((error) => {});
  }
  edit(req, res, next) {
    Product.findById(req.params.id)
      .then((product) => {
        res.render("products/edit", { product: mongooseToObject(product) });
      })
      .catch(next);
  }
  update(req, res, next) {
    Product.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.redirect("/");
      })
      .catch(next);
  }
  destroy(req, res, next) {
    Product.delete({ _id: req.params.id })
      .then(() => {
        res.redirect("back");
      })
      .catch(next);
  }
  restore(req, res, next) {
    Product.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  destroyForce(req, res, next) {
    Product.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  handleFormAction(req, res, next) {
    switch (req.body.action) {
      case "delete":
        Product.delete({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect("back"))
          .catch(next);
        break;
      default:
        res.json({ message: Invalid });
    }
  }
}
module.exports = new ProductsController();
