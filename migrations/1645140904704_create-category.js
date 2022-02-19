/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("category", {
    id: "id",
    name: {
      type: "varchar (255)",
      notNull: true,
    },
    user_id: {
      type: "int",
      notNull: true,
      references: "user",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("category");
};
