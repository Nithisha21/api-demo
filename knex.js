const config = {
  client: "pg",
  connection: "postgres://postgres:123456@127.0.0.1:5432/postgres", //postgres://user:password@host/database

  // for prod
  //connection:  {
  //     host: 127.0.0.1:5432,
  //     user: "postgres",
  //     password: "123456",
  //     database: "postgres",
  //   },

  pool: {
    min: 0,
    max: 10,
  },
};

module.exports = require("knex")(config);
