const User = require("../models/AuthLogin");
var jwt = require("jsonwebtoken");
const { mutipleMongooseToObject } = require("../../util/mongoose");
// const { mongooseToObject } = require("../../util/mongoose");

class AuthLoginController {
  login(req, res, next) {
    res.render("Auth/auth-login");
  }
  logout(req, res, next) {
    res.clearCookie("tokenId");
    res.send("Da xoa cookie");
  }
  connect(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    User.findOne({ email: email, password: password })
      .then((data) => {
        if (data) {
          var token = jwt.sign({ _id: data._id }, "1712");
          res.cookie("tokenId", token);
          res.redirect("/");

          // return res.json({
          //   mess: "Thành Công",
          //   token: token,

          // });
        } else {
          res.status(300).json("Thất Bại");
        }
      })
      .catch(() => res.status(500).json("Server Bận"));
  }
  ///Post/ create signup
  formcreate(req, res, next) {
    res.render("Auth/auth-signup");
  }

  create(req, res, next) {
    User.findOne({ email: req.body.email })
      .then((data) => {
        if (data) {
          res.status(300).json("Email đã tồn tại");
        } else {
          const user = new User(req.body);
          return user
            .save()
            .then(() => res.redirect("/auth/create_account"))
            .catch((error) => {});
        }
      })
      .catch(() => res.status(500).json("Server Bận"));
  }
}
module.exports = new AuthLoginController();
