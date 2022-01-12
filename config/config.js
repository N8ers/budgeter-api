const { development } = require("../knexfile");

let knex = require("knex")(development);

module.exports = knex;
