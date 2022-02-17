const knex = require("../../../config/config");

const { validateUserSchema } = require("../../middleware/schemaValidation");

const router = require("express").Router();

// Create User
router.post("/", validateUserSchema, async (req, res) => {
  try {
    let [result] = await knex("user")
      .insert({ name: req.body.name })
      .returning(["id", "name"]);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

// Update User
router.put("/", validateUserSchema, async (req, res) => {
  const userExists = await knex("user").where({ id: req.body.id });

  if (!userExists.length) {
    return res
      .status(400)
      .json({ message: `User with id ${req.body.id} does not exist.` });
  }

  const [result] = await knex("user")
    .update({ name: req.body.name })
    .where({ id: req.body.id })
    .returning(["id", "name"]);

  res.status(200).json(result);
});

// Delete User
router.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  const userExists = await knex("user").where({ id: userId });

  if (!userExists.length) {
    return res
      .status(400)
      .json({ message: `User with id ${req.params.id} does not exist.` });
  }

  const [result] = await knex("user").where({ id: userId }).del("id");
  res.status(200).json(result);
});

// Get All Users
router.get("/", async (req, res) => {
  const result = await knex.select("*").from("user");
  res.status(200).json(result);
});

// Get User By Id
router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const result = await knex
    .select("*")
    .from("user")
    .where({ id: userId })
    .catch((error) => {
      res.status(500).json({ message: `${error.message}. \n${error.hint}` });
    });
  if (!result.length) {
    return res.status(500).json({ message: `User ${userId} may not exist.` });
  } else {
    const [user] = result;
    res.status(200).json(user);
  }
});

module.exports = router;
