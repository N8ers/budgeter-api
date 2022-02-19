/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("vendors", {
    id: "id",
    name: {
      type: "varchar (255)",
      notNull: true,
    },
    user_id: {
      type: "int",
      notNull: true,
      references: "users",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("vendors");
};
