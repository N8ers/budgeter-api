import { Pool } from "pg";
import config from "config";

const dbConnection: {} = config.get("database.connection");

const pool: any = new Pool(dbConnection);

module.exports = {
  query: (queryString: string, params: string[], callback: any): {} => {
    return pool.query(queryString, params, callback);
  },
};
