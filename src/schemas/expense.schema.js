const Joi = require("joi");

const schema = Joi.object({
  id: Joi.number().integer(),
  description: Joi.string().min(3).max(255),
  date: Joi.date(),
  ammount: Joi.number(),
  user_id: Joi.number().integer(),
  vendor_id: Joi.number().integer(),
  category_id: Joi.number().integer(),
});

module.exports = schema;
