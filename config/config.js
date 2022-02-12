const { development, test } = require("../knexfile");

const env = process.env.NODE_ENV;

// let knexEnv = development;
let knexEnv = test;

// if (env === "test") {
//   knexEnv = test;
// }

const knex = require("knex")(knexEnv);

module.exports = knex;
