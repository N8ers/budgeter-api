exports.up = async function (knex) {
  console.log("migrate create-category");
  return knex.schema.createTable("category", function (table) {
    table.increments("id").primary();
    table.string("name");

    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("id").inTable("user");
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTable("category");
};
