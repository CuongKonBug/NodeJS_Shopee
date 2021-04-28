const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var mongooseDelete = require("mongoose-delete");
const User = new Schema(
  {
    fullname: { type: String, maxLength: 255 },
    email: { type: String, maxLength: 255 },
    password: { type: String, maxLength: 655 },
  },
  {
    timestamps: true,
  }
);
User.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });
module.exports = mongoose.model("User", User);
