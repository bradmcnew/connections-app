const express = require("express");
const router = express.Router();

// Import the controller functions for handling user-profession associations
const {
  addUserToProfession,
  removeUserFromProfession,
  getProfessionsForUser,
  getUsersForProfession,
} = require("../controllers/userProfessionsController");
const {
  validateCreateUserProfessionData,
} = require("../middleware/validators/userProfessionsValidator");

// Route to get all professions for a specific user
// @route GET /api/user-professions/users/:userId/professions
// @desc Fetches a list of professions associated with a specific user
// @param {string} userId - The ID of the user whose professions are being fetched
router.get("/users/:userId/professions", getProfessionsForUser);

// Route to get all users for a specific profession
// @route GET /api/user-professions/professions/:professionId/users
// @desc Fetches a list of users associated with a specific profession
// @param {string} professionId - The ID of the profession whose users are being fetched
router.get("/professions/:professionId/users", getUsersForProfession);

// Route to add a user to a profession
// @route POST /api/user-professions/users/:userId/professions/:professionId
// @desc Adds an association between a user and a profession
// @param {string} userId - The ID of the user to be added
// @param {string} professionId - The ID of the profession to which the user is being added
router.post("/", validateCreateUserProfessionData, addUserToProfession);

// Route to remove a user from a profession
// @route DELETE /api/user-professions/users/:userId/professions/:professionId
// @desc Removes the association between a user and a profession
// @param {string} userId - The ID of the user to be removed
// @param {string} professionId - The ID of the profession from which the user is being removed
router.delete(
  "/users/:userId/professions/:professionId",
  removeUserFromProfession
);

// Export the router to be used in the main app
module.exports = router;
