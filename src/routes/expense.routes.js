const db = require("../db");
const { validateExpenseSchema } = require("../middleware/schemaValidation");

const router = require("express").Router();

// Valid::  user_id: 1, vendor_id: _, category_id: _

router.post("/", validateExpenseSchema, async (req, res) => {
  const {
    description,
    date,
    ammount,
    user_id,
    vendor_id,
    category_id,
  } = req.body;
  const query = `
    INSERT INTO "expenses" 
      (description, date, ammount, user_id, vendor_id, category_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [description, date, ammount, user_id, vendor_id, category_id];

  try {
    const results = await db.query(query, values);
    const result = results.rows[0];
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.put("/", validateExpenseSchema, async (req, res) => {
  // SHOULD THIS BE A PATCH NOT A PUT?
});

router.delete("/:id", async (req, res) => {
  const expenseId = req.params.id;
  const query = `DELETE FROM expenses WHERE id = $1 RETURNING *;`;
  const values = [expenseId];

  try {
    const results = await db.query(query, values);
    const result = results.rows[0];
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.get("/", async (req, res) => {
  const query = `SELECT * FROM expenses`;
  const values = [];

  try {
    const results = await db.queru(query, values);
    return res.status(500).json(results.rows);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  const expenseId = req.params.id;
  const query = `SELECT * FROM expenses WHERE expenses.id = $1;`;
  const values = [expenseId];

  try {
    const results = await db.query(query, values);
    const result = results.rows[0];
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = router;
