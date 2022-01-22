exports.seed = async function (knex) {
  // Drop all tables
  await knex.schema.dropTableIfExists("expense");
  await knex.schema.dropTableIfExists("category");
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

  await knex.schema.createTable("category", function (table) {
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
    table.integer("category_id").unsigned().notNullable();

    table.foreign("user_id").references("id").inTable("user");
    table.foreign("vendor_id").references("id").inTable("vendor");
    table.foreign("category_id").references("id").inTable("category");
  });

  // // Populate tables
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

  const categories = await knex("category")
    .returning(["id", "name", "user_id"])
    .insert([
      { name: "Groceries", user_id: users[1].id },
      { name: "Health", user_id: users[1].id },
      { name: "Clothes", user_id: users[2].id },
      { name: "Other", user_id: users[2].id },
    ]);

  console.log("generated categories: ", categories);

  const expenses = await knex("expense")
    .returning("*")
    .insert([
      {
        description: "mac-mini",
        date: new Date("Jan 8, 2022").toISOString(),
        ammount: 769.0,
        category_id: categories[3].id,
        user_id: users[2].id,
        vendor_id: vendors[3].id,
      },
      {
        description: "bath bombs",
        date: new Date("Jan 8, 2022").toISOString(),
        ammount: 769.0,
        category_id: categories[2].id,
        user_id: users[1].id,
        vendor_id: vendors[1].id,
      },
      {
        description: "general groceries",
        date: new Date("Jan 2, 2022").toISOString(),
        ammount: 769.0,
        category_id: categories[0].id,
        user_id: users[1].id,
        vendor_id: vendors[0].id,
      },
      {
        description: "new running shorts",
        type: "clothes",
        date: new Date("Jan 2, 2022").toISOString(),
        ammount: 769.0,
        category_id: categories[2].id,
        user_id: users[2].id,
        vendor_id: vendors[2].id,
      },
    ]);

  console.log("generated expenses: ", expenses);
};
