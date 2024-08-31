const path = require("path");
const pool = require("../config/db");
const {
  handleGetAllRequest,
  handleGetPostById,
  handleCreatePost,
  handleUpdatePost,
  handleDeletePost,
} = require("../utils/controllerHelpers");

// @desc Get all users
// @route GET /api/users
const getAllUsers = handleGetAllRequest("users");

// @desc Get post by ID
// @route GET /api/users/:id
const getUserById = handleGetPostById("users");

// @desc Create a new post
// @route POST /api/users
const createUser = handleCreatePost("users");

// @desc Update a post
// @route PUT /api/users/:id
const updateUser = handleUpdatePost("users");

// @desc Delete a post
// @route DELETE /api/users/:id
const deleteUser = handleDeletePost("users");

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
