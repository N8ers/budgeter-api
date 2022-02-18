/* eslint-disable camelcase */

const knex = require("../config/config");

exports.shorthands = undefined;

exports.up = (pgm) => {
  console.log("migration 2");
  return knex.schema.createTable("vendor", function (table) {
    table.increments("id").primary();
    table.string("name", 225);

    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("id").inTable("user");
  });
};

exports.down = (pgm) => {
  return knex.schema.dropTable("vendor");
};
