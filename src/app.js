const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config();

const routes = {
  users: require("./routes/user.routes/index"),
  expenses: require("./routes/expense.routes.js"),
  vendors: require("./routes/vendor.routes.js"),
  category: require("./routes/category.routes.js"),
};

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.status(200).send("new setup works");
});

app.use("/users", routes.users);
app.use("/expenses", routes.expenses);
app.use("/vendors", routes.vendors);
app.use("/category", routes.category);

// catch all routes that don't exist
app.get("*", function (req, res) {
  res.status(404).send("no such route exists");
});

module.exports = app;
