exports.up = function (knex) {
  return knex.schema.createTable("user", function (table) {
    table.increments("id");
    table.string("name", 225).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("user");
};
