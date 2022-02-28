const userSchema = require("../schemas/user.schema");
const categorySchema = require("../schemas/category.schema");
const vendorSchema = require("../schemas/vendor.schema");
const expenseSchema = require("../schemas/expense.schema");

const generateSchema = async function (req, res, next, schema) {
  const body = req.body;
  const { error, value } = schema.validate(body);

  if (error) {
    const errors = error.details.map((error) => error.message).join(". ");
    res.status(422).json({ status: "error", message: errors, data: value });
  } else {
    return next();
  }
};

const validateUserSchema = async function (req, res, next) {
  await generateSchema(req, res, next, userSchema);
};

const validateCategorySchema = async function (req, res, next) {
  await generateSchema(req, res, next, categorySchema);
};

const validateVendorSchema = async function (req, res, next) {
  await generateSchema(req, res, next, vendorSchema);
};
const validateExpenseSchema = async function (req, res, next) {
  await generateSchema(req, res, next, expenseSchema);
};

module.exports = {
  validateUserSchema,
  validateCategorySchema,
  validateVendorSchema,
  validateExpenseSchema,
};
