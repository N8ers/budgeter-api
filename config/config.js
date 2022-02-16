const { development, test, ciTest } = require("../knexfile");

const env = process.env.NODE_ENV;

let knexEnv = development;

if (env === "test") {
  knexEnv = test;
}

if (env === "ciTest") {
  knexEnv = ciTest;
}

const knex = require("knex")(knexEnv);

module.exports = knex;
