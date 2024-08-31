const pool = require("../config/db");
const {
  handleGetAllRequest,
  handleGetPostById,
  handleCreatePost,
  handleUpdatePost,
  handleDeletePost,
} = require("../utils/controllerHelpers");

// @desc Get all posts
// @route GET /api/posts
const getAllPosts = handleGetAllRequest("posts");

// @desc Get post by ID
// @route GET /api/posts/:id
const getPostById = handleGetPostById("posts");

// @desc Create a new post
// @route POST /api/posts
const createPost = handleCreatePost("posts");

// @desc Update a post
// @route PUT /api/posts/:id
const updatePost = handleUpdatePost("posts");

// @desc Delete a post
// @route DELETE /api/posts/:id
const deletePost = handleDeletePost("posts");

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
