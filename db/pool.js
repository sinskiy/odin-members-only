const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.POSTGRES_DATABASE_URL,
});

module.exports = pool;
