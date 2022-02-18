/* eslint-disable camelcase */

const knex = require("../config/config");

exports.shorthands = undefined;

exports.up = (pgm) => {
  console.log("migration 1");
  return knex.schema.createTable("user", function (table) {
    table.increments("id").primary();
    table.string("name", 225).notNullable();
  });
};

exports.down = (pgm) => {
  return knex.schema.dropTable("user");
};
