const knex = require("../../config/config");

const {
  validateCategoryQueryParams,
  validateDateRangeQueryParams,
} = require("../middleware/requestValidation");
const { sortQueryBuilder } = require("../middleware/sort");

const router = require("express").Router();

// Get All Users
router.get("/", async (req, res) => {
  const result = await knex.select("*").from("user");
  res.status(200).send(result);
});

// Get User By Id
router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const result = await knex
    .select("*")
    .from("user")
    .where({ id: userId })
    .catch((error) => {
      res.status(500).send(`${error.message}. \n${error.hint}`);
    });
  if (!result.length) {
    res.status(500).send(`User ${userId}, may not exist.`);
  } else {
    res.status(200).send(result);
  }
});

// Get User Expenses
router.get(
  "/:userId/expenses",
  sortQueryBuilder,
  validateDateRangeQueryParams,
  validateCategoryQueryParams,
  async (req, res) => {
    const userId = req.params.userId;
    const startDate = req.query.startDate || null;
    const endDate = req.query.endDate || null;
    const categoryId = req.query.categoryId || null;
    const limit = req?.query?.limit || 5;
    const offset = req?.query?.offset || 1;

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

        // Sorting
        if (req.sortBy?.field && req.sortBy?.order) {
          queryBuilder.orderBy(req.sortBy.field, req.sortBy.order);
        }

        // Pagination
        queryBuilder.limit(limit).offset(offset);
      })
      .catch((error) => {
        res.status(500).send(`{error.message}. \n${error.hint}`);
      });

    res.status(200).send(userExpenses);
  }
);

module.exports = router;
