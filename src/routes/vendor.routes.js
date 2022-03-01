const db = require("../db");
const { validateVendorSchema } = require("../middleware/schemaValidation");

const router = require("express").Router();

router.post("/", validateVendorSchema, async (req, res) => {
  const vendorName = req.body.name;
  const user_id = req.body.user_id;
  const query = `
    INSERT INTO "vendors" (name, user_id)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const values = [vendorName, user_id];

  try {
    const results = await db.query(query, values);
    const result = results.rows[0];
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.put("/", validateVendorSchema, async (req, res) => {
  const vendorId = req.body.id;
  const vendorName = req.body.name;
  const query = `
    UPDATE vendors
    SET name = $1
    WHERE id = $2
    RETURNING *;
  `;
  const values = [vendorName, vendorId];

  try {
    const results = await db.query(query, values);
    const result = results.rows[0];
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.delete("/:id", async (req, res) => {
  const vendorId = req.params.id;
  const query = `DELETE FROM vendors WHERE id = $1 RETURNING *;`;
  const values = [vendorId];

  try {
    const results = await db.query(query, values);
    const result = results.rows[0];
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.get("/", async (req, res) => {
  const query = `SELECT * FROM vendors`;
  const values = [];

  try {
    const result = await db.query(query, values);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  const vendorId = req.params.id;
  const query = `
    SELECT * FROM vendors
    WHERE vendors.id = $1;
  `;
  const values = [vendorId];

  try {
    const results = await db.query(query, values);
    const result = results.rows[0];
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = router;
