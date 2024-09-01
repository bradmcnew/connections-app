const {
  handleGetAllRequest,
  handleGetByIdRequest,
  handleDeleteRequest,
  handleCreateRequest,
  handleUpdateRequest,
} = require("../utils/controllerHelpers");

// @desc Create a new meeting
// @route POST /api/meetings
const createMeeting = async (req, res, next) => {
  try {
    const { post_id, user_id, scheduled_time, status } = req.body;
    const newPost = await handleCreateRequest("meetings")({
      post_id,
      user_id,
      scheduled_time,
      status,
    });
    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
};

// @desc Update a meeting
// @route PUT /api/meetings/:id
const updateMeeting = async (req, res, next) => {
  try {
    const meetingId = req.params.id;
    const { post_id, user_id, scheduled_time, status } = req.body;
    const updatedMeeting = await handleUpdateRequest("meetings")(meetingId, {
      post_id,
      user_id,
      scheduled_time,
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
