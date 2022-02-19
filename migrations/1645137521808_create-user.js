/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = async (pgm) => {
  await pgm.createTable("user", {
    id: "id",
    name: {
      type: "varchar(255)",
      notNull: true,
    },
  });
};

exports.down = async (pgm) => {
  await pgm.dropTable("user");
};
