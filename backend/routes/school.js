const express = require("express");
const router = express.Router();

// Import the controller functions for handling school routes
const {
  getAllSchools,
  getSchoolById,
  createSchool,
  updateSchool,
  deleteSchool,
} = require("../controllers/schoolController");

// Route to get all schools
// @route GET /api/schools
// @desc Fetches a list of all schools
router.get("/", getAllSchools);

// Route to get a single school by its ID
// @route GET /api/schools/:id
// @desc Fetches details of a specific school by ID
// @param {string} id - The ID of the school
router.get("/:id", getSchoolById);

// Route to create a new school
// @route POST /api/schools
// @desc Creates a new school entry
// @body {object} school data - The data required to create a new school
router.post("/", createSchool);

// Route to update an existing school
// @route PUT /api/schools/:id
// @desc Updates an existing school's details by ID
// @param {string} id - The ID of the school to update
// @body {object} updated school data - The new data for the school
router.put("/:id", updateSchool);

// Route to delete a school by its ID
// @route DELETE /api/schools/:id
// @desc Deletes a specific school by ID
// @param {string} id - The ID of the school to delete
router.delete("/:id", deleteSchool);

// Export the router to be used in the main app
module.exports = router;
