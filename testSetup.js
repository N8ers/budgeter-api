module.exports = async () => {
  console.log("GLOBAL TEST SETUP");
  const knex = require("./config/config");

  // rollback all migrations
  console.log("Attempting rollback");
  await knex.migrate.rollback([], true);
  console.log("Rollback succeeded");

  // knex migrate:latest
  console.log("Attempting migration");
  await knex.migrate.latest([]);
  console.log("migration succeeded");
};
