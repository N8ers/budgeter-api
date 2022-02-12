module.exports = async () => {
  console.log("GLOBAL TEST SETUP");
  const knex = require("./config/config");

  // rollback all migrations
  await knex.migrate.rollback([], true);

  // knex migrate:latest
  await knex.migrate.latest([]);
};
