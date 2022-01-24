const { format, parseISO, isMatch } = require("date-fns");

const knex = require("../../config/config");

const router = require("express").Router();

// Get All Users
router.get("/", async (req, res) => {
  const result = await knex.select("*").from("user");
  res.status(200).send(result);
});

// Get User By Id
router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const result = await knex.select("*").from("user").where({ id: userId });
  res.status(200).send(result);
});

function formatIsCorrect(date) {
  const units = date.split("-");
  console.log({ units });
  console.log("unites.lenght ", units.length);
  if (units.length !== 3) {
    console.log("INCORRECT FORMAT");
  }

  if (units[0].length !== 4) {
    console.log("INCORRECT YEAR");
  } else if (units[1].length !== 2) {
    console.log("INCORRECT MONTH");
  } else if (units[2].length !== 2) {
    console.log("INCORRECT DAY");
  }
}

function formatAndValidateDate(date) {
  // Format to YYYY-MM-DD for Postgres
  if (!date) return null;

  formatIsCorrect(date);

  console.log("date ", date.toString());
  const format = "yyyy-MM-dd";
  console.log("format ", format);
  const match = isMatch(date, format);
  console.log("match ", match);

  // const parsedDate = parseISO(date);
  // console.log("parsedDate ", parsedDate);
  // if (parsedDate === "Invalid Date") {
  //   console.log("INVALID DATE - should send like a 400 (or something)");
  // }
  // const formattedDate = format(parsedDate, "y-M-d");
  // console.log("formattedDate ", formattedDate);
}

// Get User Expenses
router.get("/:id/expenses", async (req, res) => {
  const userId = req.params.id;
  const startDate = formatAndValidateDate(req.query.startDate);
  const endDate = formatAndValidateDate(req.query.endDate);

  // Abstract this middleware/validation stuff
  if ((startDate && !endDate) || (!startDate && endDate)) {
    res
      .status(400)
      .send(
        "You must specify a startDate and endDate if you want to filter by date."
      );
  }

  // filter on category too!

  if (startDate && endDate) {
    // validate date format
    query("startDate").isDate();
  }

  // probably put this in a controller too?
  // if (startDate && endDate) {
  //   const userExpenses = await knex
  //     .select("*")
  //     .from("expense")
  //     .where({ user_id: userId })
  //     .where("date", ">=", startDate)
  //     .where("date", "<=", endDate);
  //   console.log("userExpenses ", userExpenses);
  // }

  // put this in a controller?
  const userExpenses = await knex
    .select("*")
    .from("expense")
    .where({ user_id: userId });
  console.log("userExpenses ", userExpenses);

  res.status(200).send(userExpenses);
});

// get user/:id/expenses?sort/filter/etc

module.exports = router;
