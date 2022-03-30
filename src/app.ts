// import express, { Application, Request, Response, NextFunction } from "express";
// import bodyParser from "body-parser";
// import morgan from "morgan";

// const routes = {
//   users: require("./routes/user.routes/index"),
//   expenses: require("./routes/expense.routes.js"),
//   vendors: require("./routes/vendor.routes.js"),
//   categories: require("./routes/category.routes.js"),
// };

// const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(morgan("tiny"));

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3001");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// app.get("/", (req, res) => {
//   console.log("ROUTE HIT");
//   res.status(200).send("new setup works");
// });

// app.use("/users", routes.users);
// app.use("/expenses", routes.expenses);
// app.use("/vendors", routes.vendors);
// app.use("/categories", routes.categories);

// // catch all routes that don't exist
// app.get("*", function (req, res) {
//   res.status(404).send("no such route exists");
// });

// export default app;

import express, { Application, Request, Response, NextFunction } from "express";

const app: Application = express();

app.use("/", (req: Request, res: Response, next: NextFunction): void => {
  res.json({ message: "Allo! Catch-all route." });
});

export default app;
