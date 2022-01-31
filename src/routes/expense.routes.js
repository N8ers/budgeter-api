const knex = require("../../config/config");

const router = require("express").Router();

const validateSortQueryParam = function (req, res, next) {
  // we only care about sorting by date right now
  // need to research more about asc/desc soryBy url formatting
  // ex) /expenses?sortBy=date:asc/desc ???

  const sortBy = req?.query?.sortBy;

  if (sort && !(sort === "asc" || sort === "desc")) {
    console.log("You may only sort on `asc` and `desc`");
  }

  console.log({ sort });
  return next();
};

router.get("/", validateSortQueryParam, async (req, res) => {
  const result = await knex.select("*").from("expense");
  res.status(200).send(result);
});

module.exports = router;
