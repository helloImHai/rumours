const { Pool } = require("pg");

const pool = new Pool({
  user: "hai",
  host: "",
  database: "rumours",
  password: "",
  post: 5432,
});

module.exports = pool;
