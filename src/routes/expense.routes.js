const knex = require("../../config/config");

const router = require("express").Router();

const validateSortQueryParam = async function (req, res, next) {
  // ex) /expenses?sort=-date (desc)
  // ex) /expenses?sort=date  (asc)

  const sortBy = req?.query?.sort;

  if (!sortBy) {
    return next();
  }

  // obviously hardcoding the tableName is bad... what is a better/generic way?
  const tableName = "expense";
  const columnName = sortBy.charAt(0) === "-" ? sortBy.substring(1) : sortBy;
  const columnExists = await knex.schema.hasColumn(tableName, columnName);

  if (!columnExists) {
    res.status(400).send(`The column "${sortBy}" cannot be sorted on.`);
  } else {
    return next();
  }
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

router.get("/raw-test", async (req, res) => {
  // const result = await knex.schema.raw("SELECT * FROM $1", ["expense"]);
  const result = await knex.schema.raw("SELECT * FROM expense", []);
  console.log({ result });
  result.fields.forEach((field) => console.log(field.name));
  res.status(200).send(result);
});

module.exports = router;
