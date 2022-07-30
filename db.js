const Pool = require("pg").Pool;
const pool = new Pool({
  user: "root",
  password: "2110",
  host: "localhost",
  port: 5432,
  database: "base",
});

module.exports = pool;
