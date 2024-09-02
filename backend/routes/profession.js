const express = require("express");
const router = express.Router();

// Import the controller functions for handling profession routes
const {
  getAllProfessions,
  getProfessionById,
  createProfession,
  updateProfession,
  deleteProfession,
} = require("../controllers/professionController");

// Route to get all professions
// @route GET /api/professions
// @desc Fetches a list of all professions
router.get("/", getAllProfessions);

// Route to get a single profession by its ID
// @route GET /api/professions/:id
// @desc Fetches details of a specific profession by ID
// @param {string} id - The ID of the profession
router.get("/:id", getProfessionById);

// Route to create a new profession
// @route POST /api/professions
// @desc Creates a new profession entry
// @body {object} profession data - The data required to create a new profession
router.post("/", createProfession);

// Route to update an existing profession
// @route PUT /api/professions/:id
// @desc Updates an existing profession's details by ID
// @param {string} id - The ID of the profession to update
// @body {object} updated profession data - The new data for the profession
router.put("/:id", updateProfession);

// Route to delete a profession by its ID
// @route DELETE /api/professions/:id
// @desc Deletes a specific profession by ID
// @param {string} id - The ID of the profession to delete
router.delete("/:id", deleteProfession);

// Export the router to be used in the main app
module.exports = router;
