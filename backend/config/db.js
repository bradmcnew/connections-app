const { Pool } = require("pg");
// load environment variables
require("dotenv").config();

const IS_TESTING = process.env.NODE_ENV === "test";
// Debugging log for environment variables
console.log("IS_TESTING:", IS_TESTING);
console.log("DB_NAME:", process.env.DB_NAME);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: IS_TESTING ? process.env.TEST_DB_NAME : process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

console.log("Pool Configuration:", {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: IS_TESTING ? process.env.TEST_DB_NAME : process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

console.log("Database:", pool.options.database);

pool.on("connect", () => {
  console.log("Connected to the PostgreSQL database");
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
