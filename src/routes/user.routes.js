const knex = require("../../config/config");

const router = require("express").Router();

// Get All Users
router.get("/", async (req, res) => {
  const result = await knex.select("*").from("user");
  res.status(200).send(result);
});

// Get User By Id
router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const result = await knex.select("*").from("user").where({ id: userId });
  res.status(200).send(result);
});

// get user/:id/expenses?sort/filter/etc

module.exports = router;
