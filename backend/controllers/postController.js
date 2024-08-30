const path = require("path");
const pool = require("../config/db");

// @desc Get all posts
// @route GET /api/posts
const getAllPosts = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM posts");
    console.log("result", result);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("error fetching posts", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc Get post by ID
// @route GET /api/posts/:id
const getPostById = async (req, res, next) => {
  const postId = req.params.id;
  try {
    const result = await pool.query("SELECT * FROM posts WHERE id = $1", [
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
// @route POST /api/posts
const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const result = await pool.query(
      "INSERT INTO POSTS (title, content) VALUES ($1, $2) RETURNING *",
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
// @route PUT /api/posts/:id
const updatePost = async (req, res, next) => {
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

// @desc Delete a post
// @route DELETE /api/posts/:id
const deletePost = async (req, res, next) => {
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

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
