const { body } = require("express-validator");
const allowedStatuses = ["pending", "confirmed", "cancelled"];

const validateCreateMeetingData = [
  body("post_id")
    .notEmpty()
    .withMessage("post_id is required")
    .isInt()
    .withMessage("post_id must be an integer"),
  body("user_id")
    .notEmpty()
    .withMessage("user_id is required")
    .isInt()
    .withMessage("user_id must be an integer"),
  body("scheduled_time")
    .notEmpty()
    .withMessage("scheduled_time is required")
    .isISO8601()
    .withMessage("Invalid scheduled_time format"),
  body("status")
    .optional()
    .notEmpty()
    .withMessage("status cannot be empty if provided")
    .isIn(allowedStatuses)
    .withMessage(`status must be one of ${allowedStatuses.join(", ")}`),
];

const validateUpdateMeetingData = [
  body("post_id")
    .optional()
    .notEmpty()
    .withMessage("post_id cannot be empty if provided")
    .isInt()
    .withMessage("post_id must be an integer"),
  body("user_id")
    .optional()
    .notEmpty()
    .withMessage("user_id cannot be empty if provided")
    .isInt()
    .withMessage("user_id must be an integer"),
  body("scheduled_time")
    .notEmpty()
    .withMessage("scheduled_time is required")
    .isISO8601()
    .withMessage("Invalid scheduled_time format"),
  body("status")
    .optional()
    .notEmpty()
    .withMessage("status cannot be empty if provided")
    .isIn(allowedStatuses)
    .withMessage(`status must be one of ${allowedStatuses.join(", ")}`),
];

module.exports = {
  validateCreateMeetingData,
  validateUpdateMeetingData,
};
