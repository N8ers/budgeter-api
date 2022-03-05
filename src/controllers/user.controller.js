const db = require("../db");

const createUser = async function (name) {
  const query = `
      INSERT INTO "users" (name)
      VALUES ($1)
      RETURNING *;
    `;
  const values = [name];

  try {
    const results = await db.query(query, values);
    const result = results.rows[0];
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const updateUser = async function () {};

const getUsers = async function () {};

const getUserById = async function () {};

module.exports = {
  createUser,
  updateUser,
  getUsers,
  getUserById,
};
