const { development, test } = require("../knexfile");

const env = process.env.NODE_ENV;

let knexEnv = development;

if (env === "test") {
  knexEnv = test;
}

// const knex = require("knex")(knexEnv);
const knex = require("knex")(test);

module.exports = knex;
