const express = require("express");
const router = express.Router();

// Import the controller functions for handling meeting routes
const {
  getAllMeetings,
  getMeetingById,
  createMeeting,
  updateMeeting,
  deleteMeeting,
} = require("../controllers/meetingController");

// Route to get all meetings
// @route GET /api/meetings
// @desc Fetches a list of all meetings
router.get("/", getAllMeetings);

// Route to get a single meeting by its ID
// @route GET /api/meetings/:id
// @desc Fetches details of a specific meeting by ID
// @param {string} id - The ID of the meeting
router.get("/:id", getMeetingById);

// Route to create a new meeting
// @route POST /api/meetings
// @desc Creates a new meeting entry
// @body {object} meeting data - The data required to create a new meeting
router.post("/", createMeeting);

// Route to update an existing meeting
// @route PUT /api/meetings/:id
// @desc Updates an existing meeting's details by ID
// @param {string} id - The ID of the meeting to update
// @body {object} updated meeting data - The new data for the meeting
router.put("/:id", updateMeeting);

// Route to delete a meeting by its ID
// @route DELETE /api/meetings/:id
// @desc Deletes a specific meeting by ID
// @param {string} id - The ID of the meeting to delete
router.delete("/:id", deleteMeeting);

// Export the router to be used in the main app
module.exports = router;
