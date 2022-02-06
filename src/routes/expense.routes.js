const knex = require("../../config/config");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const sortBy = req?.query?.sort;

  const result = await knex
    .select("*")
    .from("expense")
    .modify((queryBuilder) => {
      if (sortBy) {
        // ex) /expenses?sort=-date (desc)
        // ex) /expenses?sort=date  (asc)
        const sortByIndexZero = sortBy.split("")[0];
        if (sortByIndexZero === "-") {
          queryBuilder.orderBy(sortBy.substring(1), "desc");
        } else {
          queryBuilder.orderBy(sortBy, "asc");
        }
      }
    })
    .then((result) => result)
    .catch((error) => {
      res.status(500).send(`${error.message}. \n${error.hint}`);
    });

  res.status(200).send(result);
});

router.get("/raw-test", async (req, res) => {
  // const result = await knex.raw("SELECT * FROM :table", [{ table: "expense" }]);
  const result = await knex.schema.raw("SELECT * FROM expense", []);
  console.log({ result });
  result.fields.forEach((field) => console.log(field.name));
  res.status(200).send(result);
});

module.exports = router;
