const mongoose = require("mongoose");
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const Schema = mongoose.Schema;
var mongooseDelete = require("mongoose-delete");
const Category = new Schema(
  {
    category_name: { type: String, maxLength: 255 },
    kk: { type: String, maxLength: 255 },
  },
  {
    timestamps: true,
  }
);
Category.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });
module.exports = mongoose.model("Categorys", Category);
