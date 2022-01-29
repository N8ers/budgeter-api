const knex = require("../../config/config");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const result = await knex.select("*").from("category");
  res.status(200).send(result);
});

module.exports = router;
