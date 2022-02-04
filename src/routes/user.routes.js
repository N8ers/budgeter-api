const knex = require("../../config/config");

const {
  validateCategoryQueryParams,
  validateDateRangeQueryParams,
} = require("../../middleware/requestValidation");

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

// Get User Expenses
router.get(
  "/:id/expenses",
  validateDateRangeQueryParams,
  validateCategoryQueryParams,
  async (req, res) => {
    const userId = req.params.id;
    const startDate = req.query.startDate || null;
    const endDate = req.query.endDate || null;
    const categoryId = req.query.categoryId || null;

    const userExpenses = await knex
      .select("*")
      .from("expense")
      .where({ user_id: userId })
      .modify((queryBuilder) => {
        if (startDate && endDate) {
          queryBuilder.where("date", ">=", startDate);
          queryBuilder.where("date", "<=", endDate);
        }

        if (categoryId) {
          queryBuilder.where({ category_id: categoryId });
        }
      });
    console.log("userExpenses ", userExpenses);
  }
);

module.exports = router;
