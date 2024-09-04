const express = require("express");
const router = express.Router();

// Import the controller functions for handling user-role associations
const {
  addUserToRole,
  removeUserFromRole,
  getRolesForUser,
  getUsersForRole,
} = require("../controllers/userRolesController.js");

// Route to get all roles for a specific user
// @route GET /api/user-roles/users/:userId/roles
// @desc Fetches a list of roles associated with a specific user
// @param {string} userId - The ID of the user whose roles are being fetched
router.get("/users/:userId/roles", getRolesForUser);

// Route to get all users for a specific role
// @route GET /api/user-roles/roles/:roleId/users
// @desc Fetches a list of users associated with a specific role
// @param {string} roleId - The ID of the role whose users are being fetched
router.get("/roles/:roleId/users", getUsersForRole);

// Route to add a user to a role
// @route POST /api/user-roles/users/:userId/roles/:roleId
// @desc Adds an association between a user and a role
// @param {string} userId - The ID of the user to be added
// @param {string} roleId - The ID of the role to which the user is being added
router.post("/users/:userId/roles/:roleId", addUserToRole);

// Route to remove a user from a role
// @route DELETE /api/user-roles/users/:userId/roles/:roleId
// @desc Removes the association between a user and a role
// @param {string} userId - The ID of the user to be removed
// @param {string} roleId - The ID of the role from which the user is being removed
router.delete("/users/:userId/roles/:roleId", removeUserFromRole);

// Export the router to be used in the main app
module.exports = router;
