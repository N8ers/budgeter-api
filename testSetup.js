module.exports = async () => {
  const knex = require("./config/config");

  // rollback all migrations
  await knex.migrate.rollback([], true);

  // knex migrate:latest
  await knex.migrate.latest([]);
};
