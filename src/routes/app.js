const express = require("express");
const bodyParser = require("body-parser");

const routes = {
  users: require("./user.routes.js"),
  expenses: require("./expense.routes.js"),
  vendors: require("./vendor.routes.js"),
};

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

// catch all routes that don't exist
app.get("*", function (req, res) {
  res.status(404).send("route does not exist");
});

module.exports = app;
