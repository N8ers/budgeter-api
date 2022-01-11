exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("expense").del();
  await knex("vendor").del();
  await knex("user").del();

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
