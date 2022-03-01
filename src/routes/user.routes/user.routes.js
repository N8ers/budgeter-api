const db = require("../../db");
const { validateUserSchema } = require("../../middleware/schemaValidation");
const { createUser } = require("../../controllers/user.controller");

const router = require("express").Router();

// Create User
router.post("/", validateUserSchema, async (req, res) => {
  const { name } = req.body;

  try {
    const result = await createUser(name);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Update User
router.put("/", validateUserSchema, async (req, res) => {
  const userId = req.body.id;
  const userName = req.body.name;
  const query = `
    UPDATE users
    SET name = $1
    WHERE id = $2
    RETURNING *;
  `;
  const values = [userName, userId];

  try {
    const results = await db.query(query, values);
    const result = results.rows[0];
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

// Delete User
router.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  const query = `DELETE FROM users WHERE id = $1 RETURNING *`;
  const values = [userId];

  try {
    const results = await db.query(query, values);
    const result = results.rows[0];
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

// Get All Users
router.get("/", async (req, res) => {
  const query = `SELECT * FROM users`;
  const values = [];

  try {
    const result = await db.query(query, values);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

// Get User By Id
router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const query = `
    SELECT * FROM users
    WHERE users.id = $1;
  `;
  const values = [userId];

  try {
    const results = await db.query(query, values);
    const result = results.rows[0];
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = router;
