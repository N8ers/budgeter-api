const Joi = require("joi");

const schema = Joi.object({
  id: Joi.number().integer(),
  name: Joi.string().min(3).max(100).required(),
  user_id: Joi.number().integer(),
});

module.exports = schema;
