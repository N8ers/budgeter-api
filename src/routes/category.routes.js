const db = require("../db");
const { validateCategorySchema } = require("../middleware/schemaValidation");

const router = require("express").Router();

router.post("/", validateCategorySchema, async (req, res) => {
  const categoryName = req.body.name;
  const user_id = req.body.user_id;
  const query = `
    INSERT INTO "categories" (name, user_id)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const values = [categoryName, user_id];
  console.log(query, values);

  try {
    const results = await db.query(query, values);
    console.log("results ", results);
    const result = results.rows[0];
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.put("/", validateCategorySchema, async (req, res) => {
  const categoryId = req.body.id;
  const categoryName = req.body.name;
  const query = `
    UPDATE categories
    SET name = $1
    WHERE id = $2
    RETURNING *;
  `;
  const values = [categoryName, categoryId];

  try {
    const results = await db.query(query, values);
    const result = results.rows[0];
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.delete("/:id", async (req, res) => {
  const categoryId = req.params.id;
  const query = `DELETE FROM categories WHERE id = $1 RETURNING *;`;
  const values = [categoryId];

  try {
    const results = await db.query(query, values);
    const result = results.rows[0];
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.get("/", async (req, res) => {
  const query = `SELECT * FROM categories;`;
  const values = [];

  try {
    const result = await db.query(query, values);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  const categoryId = req.params.id;
  const query = `
    SELECT * FROM categories
    WHERE categories.id = $1;
  `;
  const values = [categoryId];

  try {
    const results = await db.query(query, values);
    const result = results.rows[0];
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = router;
