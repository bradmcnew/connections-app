const express = require("express");
const router = express.Router();

const {
  getAllMeetings,
  getMeetingById,
  createMeeting,
  updateMeeting,
  deleteMeeting,
} = require("../controllers/meetingController");

router.get("/", getAllMeetings);
router.get("/:id", getMeetingById);
router.post("/", createMeeting);
router.put("/:id", updateMeeting);
router.delete("/:id", deleteMeeting);

module.exports = router;
