const {
  handleGetAllRequest,
  handleGetByIdRequest,
  handleDeleteRequest,
  handleCreateRequest,
  handleUpdateRequest,
} = require("../utils/controllerHelpers");
const { validationResult } = require("express-validator");

// @desc Create a new meeting
// @route POST /api/meetings
const createMeeting = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { post_id, user_id, scheduled_time, status } = req.body;

    const parsedDate = new Date(scheduled_time);
    // Validate timestamp
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: "Invalid scheduled_time format" });
    }

    const newMeeting = await handleCreateRequest("meetings")({
      post_id,
      user_id,
      scheduled_time: parsedDate.toISOString(),
      status,
    });
    res.status(201).json(newMeeting);
  } catch (err) {
    next(err);
  }
};

// @desc Update a meeting
// @route PUT /api/meetings/:id
const updateMeeting = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const meetingId = req.params.id;
    const { post_id, user_id, scheduled_time, status } = req.body;

    let formattedScheduledTime = scheduled_time; // Default to original if no parsing is done

    // Validate and format timestamp
    if (scheduled_time) {
      const parsedDate = new Date(scheduled_time);
      if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ error: "Invalid scheduled_time format" });
      }
      formattedScheduledTime = parsedDate.toISOString();
    }

    const updatedMeeting = await handleUpdateRequest("meetings")(meetingId, {
      post_id,
      user_id,
      scheduled_time: formattedScheduledTime,
      status,
    });
    res.status(200).json(updatedMeeting);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllMeetings: handleGetAllRequest("meetings"),
  getMeetingById: handleGetByIdRequest("meetings"),
  createMeeting,
  updateMeeting,
  deleteMeeting: handleDeleteRequest("meetings"),
};
