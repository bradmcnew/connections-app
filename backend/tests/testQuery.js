const { Pool } = require("pg");
require("dotenv").config(); // Ensure .env file is loaded

// Create a new pool instance
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test query to check the connection
const testQuery = async () => {
  try {
    const result = await pool.query("SELECT * FROM posts");
    console.log("Query result:", result.rows);
  } catch (err) {
    console.error("Error executing query:", err.stack);
  } finally {
    await pool.end(); // Ensure the pool is closed
  }
};

// Run the test
testQuery();
