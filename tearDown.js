module.exports = async () => {
  console.log("GLOBAL TEARDOWN");
  const knex = require("./config/config");

  await knex.destroy();
};
