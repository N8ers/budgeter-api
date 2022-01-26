const { format, parseISO, isMatch } = require("date-fns");
const { append } = require("express/lib/response");
const res = require("express/lib/response");

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

const validateDateFormat = function (date) {
  // Format to YYYY-MM-DD for Postgres
  if (!date) {
    return false;
  }

  const units = date.split("-");
  const format = "yyyy-MM-dd";
  const dateFormatIsMatch = isMatch(date, format);

  if (
    units.length !== 3 ||
    units[0].length !== 4 ||
    units[1].length !== 2 ||
    units[2].length !== 2 ||
    !dateFormatIsMatch
  ) {
    return false;
  }

  return true;
};

const validateQueryParams = function (req, res, next) {
  const startDate = req.query.startDate || null;
  const endDate = req.query.endDate || null;

  if ((startDate && !endDate) || (!startDate && endDate)) {
    res
      .status(400)
      .send(
        "You must specify a startDate and endDate if you want to filter by date."
      );
  }

  let startDateIsValid = false;
  let endDateIsValid = false;

  if (startDate && endDate) {
    startDateIsValid = validateDateFormat(startDate);
    endDateIsValid = validateDateFormat(endDate);
  }

  if (startDateIsValid && endDateIsValid) {
    next();
  } else {
    res.status(400).send('Date is formatted incorrectly. Must be "YYYY-MM-DD"');
  }
};

router.use(validateQueryParams);

// Get User Expenses
router.get("/:id/expenses", async (req, res) => {
  const userId = req.params.id;
  const startDate = req.query.startDate || null;
  const endDate = req.query.endDate || null;
  const category = req.query.category || null;

  if (category) {
    // filter on category too!
  }

  if (startDate && endDate) {
    // add to query params
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
  // const userExpenses = await knex
  //   .select("*")
  //   .from("expense")
  //   .where({ user_id: userId });
  // console.log("userExpenses ", userExpenses);

  const userExpenses = await knex
    .select("*")
    .from("expense")
    .where({ user_id: userId })
    .modify((queryBuilder) => {
      if (startDate && endDate) {
        queryBuilder.where("date", ">=", startDate);
        queryBuilder.where("date", "<=", endDate);
      }
    });
  console.log("userExpenses ", userExpenses);

  res.status(200).send(userExpenses);
});

// get user/:id/expenses?sort/filter/etc

module.exports = router;
