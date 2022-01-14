const knex = require("../../config/config");

const router = require("express").Router();

router.get("/", async (req, res) => {
  res.status(200).send("user routes work!");
});

router.get("/allUsers", async (req, res) => {
  const result = await knex.select("*").from("user");
  res.status(200).send(result);
});

module.exports = router;
