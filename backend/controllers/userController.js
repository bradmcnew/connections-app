const path = require("path");
const pool = require("../config/db");

// @desc Get all users
// @route GET /api/users
const getAllUsers = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    console.log("result", result);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("error fetching users", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc Get post by ID
// @route GET /api/users/:id
const getUserById = async (req, res, next) => {
  const postId = req.params.id;
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      postId,
    ]);
    const post = result.rows[0];
    if (!post) {
      res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    console.error("error fetching post", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc Create a new post
// @route POST /api/users
const createUser = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const result = await pool.query(
      "INSERT INTO users (title, content) VALUES ($1, $2) RETURNING *",
      [title, content]
    );
    const newPost = result.rows[0];
    res.status(201).json(newPost);
  } catch (err) {
    console.error("error creating post", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc Update a post
// @route PUT /api/users/:id
const updateUser = async (req, res, next) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  try {
    const result = await pool.query(
      "UPDATE users SET title = $1, content = $2 WHERE id = $3 RETURNING *",
      [title, content, postId]
    );
    const updatedPost = result.rows[0];
    if (!updatedPost) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    console.error("error updating post", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc Delete a post
// @route DELETE /api/users/:id
const deleteUser = async (req, res, next) => {
  const postId = req.params.id;
  try {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
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

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
