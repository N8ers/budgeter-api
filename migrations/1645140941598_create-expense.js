/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("expense", {
    id: "id",
    description: {
      type: "varchar (255)",
      notNull: false,
    },
    date: {
      type: "date",
      notNull: true,
    },
    ammount: {
      type: "float",
      notNull: true,
    },
    user_id: {
      type: "int",
      notNull: true,
      references: "user",
    },
    vendor_id: {
      type: "int",
      notNull: true,
      references: "vendor",
    },
    category_id: {
      type: "int",
      notNull: true,
      references: "category",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("expense");
};
