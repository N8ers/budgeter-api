const knex = require("./config/config");

// create test database
console.log("Attempting creation of db");
await knex.raw("CREATE DATABASE IF NO EXISTS budgeter_test");
console.log("DB created");
