const { Pool } = require("pg");
const config = require("config");

const dbConnection = config.get("database.connection");
// console.log("dbConnection: ", dbConnection);

const pool = new Pool(dbConnection);

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
