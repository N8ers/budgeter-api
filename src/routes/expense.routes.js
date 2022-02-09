const knex = require("../../config/config");

const router = require("express").Router();

const { sortQueryBuilder } = require("../../middleware/sort");

router.get("/", sortQueryBuilder, async (req, res) => {
  const limit = req?.query?.limit || 5;
  const offset = req?.query?.offset || 1;

  const result = await knex
    .select("*")
    .from("expense")
    .modify((queryBuilder) => {
      // Sorting
      if (req.sortBy?.field && req.sortBy?.order) {
        queryBuilder.orderBy(req.sortBy.field, req.sortBy.order);
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
