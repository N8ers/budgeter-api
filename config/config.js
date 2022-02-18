const { development, test, ciTest } = require("../knexfile");

const env = process.env.NODE_ENV;
console.log("config started process.env: ", process.env);

let knexEnv = development;

if (env === "test") {
  knexEnv = test;
}

if (env === "ciTest") {
  knexEnv = ciTest;
}

console.log("knexEnv ", knexEnv);
const knex = require("knex")(knexEnv);
// console.log("knex ", knex);

module.exports = knex;
