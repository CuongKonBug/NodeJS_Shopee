const User = require("../models/AuthLogin");
var jwt = require("jsonwebtoken");

module.exports.auth = function (req, res, next) {
  if (!req.cookies.tokenId) {
    res.redirect("/auth/create_account");
    return;
  } else {
    var token = req.cookies.tokenId;
    var ver = jwt.verify(token, "1712");
    User.findOne({ _id: ver })
      .then((data) => {
        res.locals.fullname = data.fullname;

        next();
      })
      .catch(next);
  }
};
module.exports.check = function (req, res, next) {
  if (req.cookies.tokenId) {
    var token = req.cookies.tokenId;
    var ver = jwt.verify(token, "1712");
    User.findOne({ _id: ver })
      .then(
        (data) => {
          res.locals.fullname = data.fullname;
          // console.log(res.locals.fullname);
          next();
        }
        // res.render("me/trash-courses")
      )
      .catch(next);
  } else {
    return;
  }
};
