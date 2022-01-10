exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user").del();
  const users = await knex("user")
    .returning(["id", "name"])
    .insert([{ name: "Tsuki" }, { name: "Goon" }, { name: "Joe" }]);

  console.log("generated users ", users);

  await knex("vendor").del();
  const vendors = await knex("vendor")
    .returning(["id", "name", "user_id"])
    .insert([
      { name: "Whole Foods", user_id: users[1].id },
      { name: "Lush", user_id: users[1].id },
      { name: "Adidas", user_id: users[2].id },
    ]);

  console.log("generated vendors ", vendors);
};
