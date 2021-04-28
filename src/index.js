const express = require("express");
const path = require("path");
const app = express();
const morgan = require("morgan");
const db = require("./config/db");
var cookieSession = require("cookie-session");
var handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
app.use(cookieParser()); // use to read format cookie

const port = process.env.PORT || 3000;
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(morgan("combined"));
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
      sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : "default";
        const icons = {
          default: "oi oi-elevator",
          asc: "oi oi-sort-ascending",
          desc: "oi oi-sort-descending",
        };
        const types = {
          default: "desc",
          asc: "desc",
          desc: "asc",
        };
        const icon = icons[sortType];
        const type = types[sortType];

        return `<a href = "?_sort&column=${field}&type=${type}">
            <span class ="${icon}"></span>
        </a>`;
      },
    },
  })
);
app.use(
  cookieSession({
    name: "session",
    keys: ["tokenId"],
  })
);

var methodOverride = require("method-override");

app.use(methodOverride("_method"));
const route = require("./routers");
const SortMiddleware = require("./app/middelwares/SortMiddleware");
app.use(SortMiddleware);
// const AuthMiddleware = require("./app/middelwares/AuthMiddleware");
// app.use(AuthMiddleware.auth);
route(app);

db.connect();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
