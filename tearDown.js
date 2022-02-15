module.exports = async () => {
  const knex = require("./config/config");

  await knex.destroy();
};
