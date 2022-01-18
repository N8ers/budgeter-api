exports.seed = async function (knex) {
  // Drop all tables
  await knex.schema.dropTableIfExists("expense");
  await knex.schema.dropTableIfExists("vendor");
  await knex.schema.dropTableIfExists("user");

  // Create tables
  await knex.schema.createTable("user", function (table) {
    table.increments("id").primary();
    table.string("name", 225).notNullable();
  });

  await knex.schema.createTable("vendor", function (table) {
    table.increments("id").primary();
    table.string("name", 225);
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("id").inTable("user");
  });

  await knex.schema.createTable("expense", function (table) {
    table.increments("id").primary();
    table.string("description");
    table.string("type");
    table.date("date");
    table.float("ammount");
    table.integer("user_id").unsigned().notNullable();
    table.integer("vendor_id").unsigned().notNullable();
    table.foreign("user_id").references("id").inTable("user");
    table.foreign("vendor_id").references("id").inTable("vendor");
  });

  // Populate tables
  const users = await knex("user")
    .returning(["id", "name"])
    .insert([{ name: "Tsuki" }, { name: "Goon" }, { name: "Joe" }]);

  console.log("generated users: ", users);

  const vendors = await knex("vendor")
    .returning(["id", "name", "user_id"])
    .insert([
      { name: "Whole Foods", user_id: users[1].id },
      { name: "Lush", user_id: users[1].id },
      { name: "Adidas", user_id: users[2].id },
      { name: "Apple", user_id: users[2].id },
    ]);

  console.log("generated vendors: ", vendors);

  const expenses = await knex("expense")
    .returning("*")
    .insert([
      {
        description: "mac-mini",
        type: "other",
        date: new Date("Jan 8, 2022").toISOString(),
        ammount: 769.0,
        user_id: users[2].id,
        vendor_id: vendors[3].id,
      },
      {
        description: "bath bombs",
        type: "health",
        date: new Date("Jan 8, 2022").toISOString(),
        ammount: 769.0,
        user_id: users[1].id,
        vendor_id: vendors[1].id,
      },
      {
        description: "general groceries",
        type: "groceries",
        date: new Date("Jan 2, 2022").toISOString(),
        ammount: 769.0,
        user_id: users[1].id,
        vendor_id: vendors[0].id,
      },
      {
        description: "new running shorts",
        type: "clothes",
        date: new Date("Jan 2, 2022").toISOString(),
        ammount: 769.0,
        user_id: users[2].id,
        vendor_id: vendors[2].id,
      },
    ]);

  console.log("generated expenses: ", expenses);
};
