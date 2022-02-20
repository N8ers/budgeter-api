/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("expenses", {
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
      references: "users",
    },
    vendor_id: {
      type: "int",
      notNull: true,
      references: "vendors",
    },
    category_id: {
      type: "int",
      notNull: true,
      references: "categories",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("expense");
};
