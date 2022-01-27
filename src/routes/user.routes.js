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

const validateCategoryQueryParams = async function (req, res, next) {
  const categoryId = req.query.categoryId || null;
  const userId = req.params.id;

  if (!categoryId) {
    return next();
  }

  const categoryIdIsValid = await knex
    .select("*")
    .from("category")
    .where({ id: categoryId, user_id: userId });

  if (!categoryIdIsValid.length) {
    res
      .status(400)
      .send("The selected category_id is not assigned to this user.");
  } else {
    return next();
  }
};

const validateDateQueryParams = function (req, res, next) {
  const startDate = req.query.startDate || null;
  const endDate = req.query.endDate || null;

  if (!startDate && !endDate) {
    return next();
  }

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
    return next();
  } else {
    res.status(400).send('Date is formatted incorrectly. Must be "YYYY-MM-DD"');
  }
};

// Get User Expenses
router.get(
  "/:id/expenses",
  validateDateQueryParams,
  validateCategoryQueryParams,
  async (req, res) => {
    const userId = req.params.id;
    const startDate = req.query.startDate || null;
    const endDate = req.query.endDate || null;
    const categoryId = req.query.categoryId || null;

    const userExpenses = await knex
      .select("*")
      .from("expense")
      .where({ user_id: userId })
      .modify((queryBuilder) => {
        if (startDate && endDate) {
          queryBuilder.where("date", ">=", startDate);
          queryBuilder.where("date", "<=", endDate);
        }

        if (categoryId) {
          queryBuilder.where({ category_id: categoryId });
        }
      });
    console.log("userExpenses ", userExpenses);

    res.status(200).send(userExpenses);
  }
);

// get user/:id/expenses?sort/filter/etc

module.exports = router;
