const pool = require("../config/db");

const getAllFromTable = async (tableName) => {
  try {
    const result = await pool.query(`SELECT * FROM ${tableName}`);
    return result.rows;
  } catch (err) {
    throw new Error(`error fetching data from ${tableName}: ${err.message}`);
  }
};

module.exports = {
  getAllFromTable,
};
