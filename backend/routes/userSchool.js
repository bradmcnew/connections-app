const express = require("express");
const router = express.Router();

// Import the controller functions for handling user-school associations
const {
  addUserToSchool,
  removeUserFromSchool,
  getSchoolsForUser,
  getUsersForSchool,
} = require("../controllers/userSchoolsController.js");

// Route to get all schools for a specific user
// @route GET /api/user-schools/users/:userId/schools
// @desc Fetches a list of schools associated with a specific user
// @param {string} userId - The ID of the user whose schools are being fetched
router.get("/users/:userId/schools", getSchoolsForUser);

// Route to get all users for a specific school
// @route GET /api/user-schools/schools/:schoolId/users
// @desc Fetches a list of users associated with a specific school
// @param {string} schoolId - The ID of the school whose users are being fetched
router.get("/schools/:schoolId/users", getUsersForSchool);

// Route to add a user to a school
// @route POST /api/user-schools/users/:userId/schools/:schoolId
// @desc Adds an association between a user and a school
// @param {string} userId - The ID of the user to be added
// @param {string} schoolId - The ID of the school to which the user is being added
router.post("/users/:userId/schools/:schoolId", addUserToSchool);

// Route to remove a user from a school
// @route DELETE /api/user-schools/users/:userId/schools/:schoolId
// @desc Removes the association between a user and a school
// @param {string} userId - The ID of the user to be removed
// @param {string} schoolId - The ID of the school from which the user is being removed
router.delete("/users/:userId/schools/:schoolId", removeUserFromSchool);

// Export the router to be used in the main app
module.exports = router;
