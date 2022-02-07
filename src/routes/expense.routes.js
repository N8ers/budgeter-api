const knex = require("../../config/config");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const sortBy = req?.query?.sort;
  const limit = req?.query?.limit || 5;
  const offset = req?.query?.offset || 1;

  const result = await knex
    .select("*")
    .from("expense")
    .modify((queryBuilder) => {
      // Sorting
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
      // Pagination
      queryBuilder.limit(limit).offset(offset);
    })
    .catch((error) => {
      res.status(500).send(`${error.message}. \n${error.hint}`);
    });

  res.status(200).send(result);
});

module.exports = router;
