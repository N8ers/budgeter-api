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

knex
  .raw("select 1+1 as result")
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("error " + err));

module.exports = knex;
