exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user").del()

  const users = await knex("user").returning(['id', 'name']).insert([
    { name: "Tsuki" },
    { name: "Goon" },
    { name: "Joe" },
  ])

  console.log('generated users ', users)
};
