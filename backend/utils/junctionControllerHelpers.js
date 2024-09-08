const pool = require("../config/db");

const handleAddAssociation = async (
  tableName,
  column1,
  column2,
  value1,
  value2
) => {
  const query = `
      INSERT INTO ${tableName} (${column1}, ${column2})
      VALUES ($1, $2)
      RETURNING *;
    `;
  const result = await pool.query(query, [value1, value2]);
  return result.rows[0];
};

const handleRemoveAssociation = async (
  tableName,
  column1,
  column2,
  value1,
  value2
) => {
  try {
    const query = `
      DELETE FROM ${tableName}
      WHERE ${column1} = $1 AND ${column2} = $2
      RETURNING *;
    `;
    const result = await pool.query(query, [value1, value2]);

    // Return true if at least one row was deleted, false otherwise
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error deleting association:", error);
    throw error;
  }
};

const handleGetAllRelated = async (
  targetTable,
  joinTable,
  joinColumn,
  targetColumn,
  id
) => {
  const query = `
      SELECT * FROM ${targetTable}
      JOIN ${joinTable}
      ON ${joinTable}.${joinColumn} = ${targetTable}.id
      WHERE ${joinTable}.${targetColumn} = $1;
    `;
  const result = await pool.query(query, [id]);
  return result.rows;
};

module.exports = {
  handleAddAssociation,
  handleRemoveAssociation,
  handleGetAllRelated,
};
