exports.up = function (knex) {
  console.log("migrate create-expense");
  return knex.schema.createTable("expense", function (table) {
    table.increments("id").primary();
    table.string("description");
    table.date("date");
    table.float("ammount");

    table.integer("user_id").unsigned().notNullable();
    table.integer("vendor_id").unsigned().notNullable();
    table.integer("category_id").unsigned().notNullable();

    table.foreign("user_id").references("id").inTable("user");
    table.foreign("vendor_id").references("id").inTable("vendor");
    table.foreign("category_id").references("id").inTable("category");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("expense");
};
