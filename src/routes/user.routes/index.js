const router = require("express").Router();

const userRoutes = require("./user.routes");
const userExpenseRoutes = require("./userExpense.routes");

router.use("/", userRoutes);
router.use("/", userExpenseRoutes);

module.exports = router;
