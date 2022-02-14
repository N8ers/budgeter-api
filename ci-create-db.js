const knex = require("./config/config");

console.log("ci-create-db.js process.env.NODE_ENV: ", process.env.NODE_ENV);

const createDB = async function () {
  console.log("Attempting creation of table");
  await knex.schema
    .createTable("cats", function (table) {
      table.increments();
      table.string("name");
    })
    .then((res) => console.log("TABLE CREATED: ", res))
    .catch((err) => console.log("TABLE FAILED: ", err));

  const insertResult = await knex("cats")
    .insert({ name: "Tsuki" })
    .returning("*")
    .toString();
  console.log("insertResult: ", insertResult);
};

createDB()
  .then((m) => console.log("THEN: ", m))
  .catch((e) => console.log("CATCH: ", e))
  .finally(() => {
    console.log("killing knex connection");
    knex.destroy();
  });
