const knex = require("./config/config");

const createDB = async function () {
  console.log("Attempting creation of db");
  await knex.raw("CREATE DATABASE IF NO EXISTS budgeter_test");
  console.log("DB created");
};

createDB()
  .then((m) => console.log("THEN: ", m))
  .catch((e) => console.log("CATCH: ", e));
