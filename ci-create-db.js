const knex = require("./config/config");

const createDB = async function () {
  console.log("Attempting creation of table");
  knex.schema
    .createTable("cats", function (table) {
      table.increments();
      table.string("name");
    })
    .then((res) => console.log("TABLE CREATED: ", res))
    .catch((err) => console.log("TABLE FAILED: ".err));

  knex("cats")
    .insert({ name: "Tsuki" })
    .returning("*")
    .toString()
    .then((res) => {
      console.log("THEN: ", res);
    })
    .catch((err) => {
      console.log("ERR: ", res);
    });
};

createDB()
  .then((m) => console.log("THEN: ", m))
  .catch((e) => console.log("CATCH: ", e));
