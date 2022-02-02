const knex = require("../../config/config");

const router = require("express").Router();

const validateSortQueryParam = function (req, res, next) {
  // ex) /expenses?sort=-date (desc)
  // ex) /expenses?sort=date (asc)

  // we need to learn more about what needs validation here...
  // do we specify fields here? make a model schema like `queryFields?`
  // can we grab fields in the expense table, and check if they match the sort

  const sortBy = req?.query?.sort;

  if (!sortBy) {
    return next();
  }

  // res.status(500).send(`there was a problem sorting by ${sortBy}: ${error}`);

  next();
};

router.get("/", validateSortQueryParam, async (req, res) => {
  const sortBy = req?.query?.sort;

  const result = await knex
    .select("*")
    .from("expense")
    .modify((queryBuilder) => {
      if (sortBy) {
        const sortByIndexZero = sortBy.split("")[0];
        if (sortByIndexZero === "-") {
          queryBuilder.orderBy(sortBy.substring(1), "desc");
        } else {
          queryBuilder.orderBy(sortBy, "asc");
        }
      }
    });

  res.status(200).send(result);
});

module.exports = router;
