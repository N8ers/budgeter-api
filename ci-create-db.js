const knex = require("./config/config");

const createDB = async function () {
  console.log("Attempting creation of db");
  await knex.raw("CREATE DATABASE IF NO EXISTS budgeter_test");
  console.log("DB created");
};

await createDB();
