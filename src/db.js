const { Pool } = require("pg");

const { development, test, ciTest } = require("../config");

const env = process.env.NODE_ENV;
let pgEnv = development;

if (env === "test") {
  pgEnv = test;
}

if (env === "ciTest") {
  pgEnv = ciTest;
}

const pool = new Pool(pgEnv);

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
