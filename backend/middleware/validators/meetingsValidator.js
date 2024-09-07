const { body } = require("express-validator");
const allowedStatuses = ["pending", "confirmed", "cancelled"];
const handleValidationErrors = require("./handleValidationErrors");

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
    .optional({ checkFalsy: true })
    .isIn(allowedStatuses)
    .withMessage(`status must be one of ${allowedStatuses.join(", ")}`),
  handleValidationErrors,
];

const validateUpdateMeetingData = [
  body("post_id")
    .optional({ checkFalsy: true })
    .isInt()
    .withMessage("post_id must be an integer if provided"),
  body("user_id")
    .optional({ checkFalsy: true })
    .isInt()
    .withMessage("user_id must be an integer if provided"),
  body("scheduled_time")
    .optional()
    .isISO8601()
    .withMessage("Invalid scheduled_time format if provided"),
  body("status")
    .optional({ checkFalsy: true })
    .isIn(allowedStatuses)
    .withMessage(`status must be one of ${allowedStatuses.join(", ")}`),
  handleValidationErrors,
];

module.exports = {
  validateCreateMeetingData,
  validateUpdateMeetingData,
};
