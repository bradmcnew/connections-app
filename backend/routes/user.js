const express = require("express");
const router = express.Router();

// Import the controller functions for handling user routes
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// Route to get all users
// @route GET /api/users
// @desc Fetches a list of all users
router.get("/", getAllUsers);

// Route to get a single user by their ID
// @route GET /api/users/:id
// @desc Fetches details of a specific user by ID
// @param {string} id - The ID of the user
router.get("/:id", getUserById);

// Route to create a new user
// @route POST /api/users
// @desc Creates a new user entry
// @body {object} user data - The data required to create a new user
router.post("/", createUser);

// Route to update an existing user
// @route PUT /api/users/:id
// @desc Updates an existing user's details by ID
// @param {string} id - The ID of the user to update
// @body {object} updated user data - The new data for the user
router.put("/:id", updateUser);

// Route to delete a user by their ID
// @route DELETE /api/users/:id
// @desc Deletes a specific user by ID
// @param {string} id - The ID of the user to delete
router.delete("/:id", deleteUser);

// Export the router to be used in the main app
module.exports = router;
