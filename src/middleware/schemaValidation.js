const userSchema = require("../schemas/user.schema");

const validateUserSchema = async function (req, res, next) {
  const body = req.body;
  const { error, value } = userSchema.validate(body);

  if (error) {
    const errors = error.details.map((error) => error.message).join(". ");
    res.status(422).json({ status: "error", message: errors, data: value });
  } else {
    return next();
  }
};

module.exports = {
  validateUserSchema,
};