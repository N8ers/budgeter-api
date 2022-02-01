const knex = require("../../config/config");

const router = require("express").Router();

const validateSortQueryParam = function (req, res, next) {
  // ex) /expenses?sortBy=date&orderBy=desc
  // with out orderBy we default to asc

  const sortByOptions = ["date"];
  const orderByOptions = ["asc", "desc"];

  const sortBy = req?.query?.sortBy;
  const orderBy = req?.query?.orderBy;

  if (!sortBy) {
    return next();
  }

  // if sortBy not in sortByOptions send('bad sort')
  if (!sortByOptions.includes(sortBy)) {
    res
      .status(400)
      .send(`sortBy only supports the following options: ${sortByOptions}`);
  }

  // if orderBy && orderBy not in orderByOptions send('bad order by')
  if (orderBy && !orderByOptions.includes(orderBy)) {
    res
      .status(400)
      .send(`orderBy only supports the following options: ${orderByOptions}`);
  }

  // make case for returning next() - maybe a `const sortingIsValid;`?
};

router.get("/", validateSortQueryParam, async (req, res) => {
  const result = await knex
    .select("*")
    .from("expense")
    .modify((queryBuilder) => {
      // if (sortBy) {
      // }
    });

  console.log("expenses ", result);
  res.status(200).send(result);
});

module.exports = router;
