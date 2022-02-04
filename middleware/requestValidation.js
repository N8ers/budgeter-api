const { isMatch } = require("date-fns");

const knex = require("../config/config");

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

const validateDateRangeQueryParams = function (req, res, next) {
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

module.exports = {
  validateCategoryQueryParams,
  validateDateRangeQueryParams,
};
