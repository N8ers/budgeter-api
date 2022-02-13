module.exports = async () => {
  console.log("GLOBAL TEST SETUP");
  const knex = require("./config/config");

  // create test database
  console.log("Attempting creation of db");
  knex
    .raw("CREATE DATABASE budgeter_test")
    .then(() => console.log("CREATED?"))
    .catch(() => console.log("CATCH"));

  // rollback all migrations
  console.log("Attempting rollback");
  await knex.migrate.rollback([], true);
  console.log("Rollback succeeded");

  // knex migrate:latest
  console.log("Attempting migration");
  await knex.migrate.latest([]);
  console.log("migration succeeded");
};
