const pool = require("../config/db");

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

const handleGetPostById = (tableName) => {
  return async (req, res, next) => {
    const postId = req.params.id;
    try {
      const result = await pool.query(
        `SELECT * FROM ${tableName} WHERE id = $1`,
        [postId]
      );
      const post = result.rows[0];
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json(post);
    } catch (err) {
      console.error("error fetching post", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

const handleCreatePost = (tableName) => {
  return async (req, res, next) => {
    try {
      const { title, content } = req.body;
      const result = await pool.query(
        "INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *",
        [title, content]
      );
      const newPost = result.rows[0];
      res.status(201).json(newPost);
    } catch (err) {
      console.error("error creating post", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

const handleUpdatePost = (tableName) => {
  return async (req, res, next) => {
    const postId = req.params.id;
    const { title, content } = req.body;
    try {
      const result = await pool.query(
        "UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *",
        [title, content, postId]
      );
      const updatedPost = result.rows[0];
      if (!updatedPost) {
        res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json(updatedPost);
    } catch (err) {
      console.error("error updating post", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

const handleDeletePost = (tableName) => {
  return async (req, res, next) => {
    const postId = req.params.id;
    try {
      const result = await pool.query(
        "DELETE FROM posts WHERE id = $1 RETURNING *",
        [postId]
      );
      const deletedPost = result.rows[0];
      if (!deletedPost) {
        res.status(404).json({ message: "Post not found" });
      }
      res.status(204).json({ message: "Post deleted" });
    } catch (err) {
      console.log("error deleting post", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

module.exports = {
  handleGetAllRequest,
  handleGetPostById,
  handleCreatePost,
  handleUpdatePost,
  handleDeletePost,
};
