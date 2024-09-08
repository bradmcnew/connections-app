const { pool } = require("../../config/db"); // Make sure to import your db configuration

/**
 * Checks if a value exists in a specified table and column.
 * @param {string} tableName - The name of the table to query.
 * @param {string} columnName - The name of the column to check.
 * @param {number|string} value - The value to check for.
 * @returns {Promise<boolean>} - True if the value exists, false otherwise.
 */
const existsInTable = async (tableName, columnName, value) => {
  const query = `SELECT 1 FROM ${tableName} WHERE ${columnName} = $1`;
  const result = await pool.query(query, [value]);
  return result.rowCount > 0;
};

module.exports = { existsInTable };
