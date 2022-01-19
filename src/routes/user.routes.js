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

// Get User Expenses
router.get("/:id/expenses", async (req, res) => {
  const userId = req.params.id;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  // Abstract this middleware/validation stuff
  if ((startDate && !endDate) || (!startDate && endDate)) {
    res
      .status(400)
      .send(
        "You must specify a startDate and endDate if you want to filter by date."
      );
  }

  if (startDate && endDate) {
    // validate date format
  }

  if (startDate && endDate) {
    // probably put this in a controller too?
    // const userExpenses = await knex
    //   .select("*")
    //   .from("expense")
    //   .where({ user_id: userId })
    //   .where("date", ">=", startDate)
    //   .where("date", "<=", endDate);
    // console.log("userExpenses ", userExpenses);
  }

  // put this in a controller?
  const userExpenses = await knex
    .select("*")
    .from("expense")
    .where({ user_id: userId });
  console.log("userExpenses ", userExpenses);

  res.status(200).send(userExpenses);
});

// get user/:id/expenses?sort/filter/etc

module.exports = router;
