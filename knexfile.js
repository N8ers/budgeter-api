module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: "localhost",
      database: "budgeter",
      user: "postgres",
      password: "2345",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
  // test: {
  //   client: "postgresql",
  //   connection: {
  //     host: "localhost",
  //     database: "budgeter_test",
  //     user: "postgres",
  //     password: "2345",
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     tableName: "knex_migrations",
  //   },
  // },
  test: {
    client: "postgresql",
    connection: {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      database: "postgres",
      user: "postgres",
      password: "postgres",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
