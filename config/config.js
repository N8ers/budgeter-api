const { development, test } = require("../knexfile");

const env = process.env.NODE_ENV;
console.log("config.js env: ", env);

let knexEnv = development;

if (env === "test") {
  knexEnv = test;
}

if (!env) {
  knexEnv = "ciTest";
}

const knex = require("knex")(knexEnv);

knex
  .raw("select 1+1 as result")
  .then(function () {
    // there is a valid connection in the pool
    console.log("CONNECTED");
  })
  .catch((err) => console.log("error " + err));

module.exports = knex;
