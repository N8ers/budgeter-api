const db = require("../../db");
const { validateUserSchema } = require("../../middleware/schemaValidation");

const router = require("express").Router();

// CONSIDER A 'user exists' middleware
// that way for a delete (or whatever else) we could say 'user id ___ delete'
// and also, 'user id ___ doesnt exist'

// Create User
router.post("/", validateUserSchema, async (req, res) => {
  const query = `
      INSERT INTO "users" (name)
      VALUES ($1)
      RETURNING *;
    `;
  const values = [req.body.name];

  try {
    const result = await db.query(query, values);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: error });
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
    const result = await db.query(query, values);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

// Delete User
router.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  const query = `DELETE FROM users WHERE id = $1`;
  const values = [userId];

  try {
    const result = await db.query(query, values);
    return res.status(200).json(result.rows);
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
    const result = await db.query(query, values);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = router;
