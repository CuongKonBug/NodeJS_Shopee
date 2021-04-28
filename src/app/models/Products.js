const mongoose = require("mongoose");
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const Schema = mongoose.Schema;
var mongooseDelete = require("mongoose-delete");
const Product = new Schema(
  {
    name: { type: String, maxLength: 255 },
    image: { type: String, maxLength: 655 },
    price_old: { type: String },
    brand: { type: String, maxLength: 255 },
    origin_name: { type: String, maxLength: 255 },
    price_current: { type: String, maxLength: 255 },
    sold: { type: String, maxLength: 255 },
    slug: { type: String, slug: "name", unique: true },
  },
  {
    timestamps: true,
  }
);
Product.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });
module.exports = mongoose.model("Product", Product);
