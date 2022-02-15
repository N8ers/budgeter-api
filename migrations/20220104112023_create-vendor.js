exports.up = function (knex) {
  return knex.schema.createTable("vendor", function (table) {
    table.increments("id").primary();
    table.string("name", 225);

    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("id").inTable("user");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("vendor");
};
