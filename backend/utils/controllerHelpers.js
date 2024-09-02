const pool = require("../config/db");

// Helper function to handle GET requests for all rows in a table
const handleGetAllRequest = (tableName) => {
  return async (req, res, next) => {
    try {
      const result = await pool.query(`SELECT * FROM ${tableName}`);
      console.log(`Fetched data from ${tableName}:`, result.rows);
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(`Error fetching data from ${tableName}:`, err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

// Helper function to handle GET requests for a single row by ID
const handleGetByIdRequest = (tableName) => {
  return async (req, res, next) => {
    const postId = req.params.id;
    try {
      const result = await pool.query(
        `SELECT * FROM ${tableName} WHERE id = $1`,
        [postId]
      );
      const row = result.rows[0];
      if (!row) {
        return res.status(404).json({ message: "Row not found" });
      }
      res.status(200).json(row);
    } catch (err) {
      console.error("error fetching row", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

// Helper function to handle DELETE requests for a single row by ID
const handleDeleteRequest = (tableName) => {
  return async (req, res, next) => {
    const postId = req.params.id;
    try {
      const result = await pool.query(
        `DELETE FROM ${tableName} WHERE id = $1 RETURNING *`,
        [postId]
      );
      const deletedPost = result.rows[0];
      if (!deletedPost) {
        res.status(404).json({ message: "Row not found" });
      }
      res.status(204).json({ message: "Row deleted" });
    } catch (err) {
      console.log("Error deleting row", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

// Helper function to create a new row in a table
const handleCreateRequest = (tableName) => {
  return async (data) => {
    const columns = [];
    const placeholders = [];
    const values = [];
    let idx = 1;

    for (const [key, value] of Object.entries(data)) {
      if (values !== undefined && value !== "") {
        columns.push(key);
        placeholders.push(`$${idx++}`);
        values.push(value);
      }
    }

    if (columns.length === 0) {
      throw new Error("No fields provided to create a row");
    }

    const query = `INSERT INTO ${tableName}(${columns.join(", ")})
      VALUES (${placeholders.join(", ")})
       RETURNING *`;
    const result = await pool.query(query, values);
    return result.rows[0];
  };
};

// Helper function to update a row in a table
const handleUpdateRequest = (tableName, includeUpdatedAt = true) => {
  return async (id, data) => {
    const updates = [];
    const values = [];
    let idx = 1;

    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined && value !== "") {
        updates.push(`${key} = $${idx++}`);
        values.push(value);
      }
    }

    if (updates.length === 0) {
      throw new Error("No fields provided to update");
    }
    if (includeUpdatedAt) updates.push(`updated_at = NOW()`);
    values.push(id);

    const query = `UPDATE ${tableName}
    SET ${updates.join(", ")}
    WHERE id = $${idx}
    RETURNING *
    `;

    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
      throw new Error("Row not found");
    }
    return result.rows[0];
  };
};

module.exports = {
  handleGetAllRequest,
  handleGetByIdRequest,
  handleDeleteRequest,
  handleCreateRequest,
  handleUpdateRequest,
};
