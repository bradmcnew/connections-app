const { body } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const validateCreatePaymentData = [
  // sender_id must be an integer
  body("sender_id")
    .notEmpty()
    .withMessage("sender_id is required")
    .isInt()
    .withMessage("sender_id must be an integer"),

  // receiver_id must be an integer
  body("receiver_id")
    .notEmpty()
    .withMessage("receiver_id is required")
    .isInt()
    .withMessage("receiver_id must be an integer"),

  // amount must be a positive float with at most 2 decimal places
  body("amount")
    .notEmpty()
    .withMessage("amount is required")
    .isFloat({ min: 0 })
    .withMessage("amount must be a positive float")
    .custom((value) => {
      const regex = /^\d+(\.\d{1,2})?$/;
      if (!regex.test(value)) {
        throw new Error("amount must have at most 2 decimal places");
      }
      return true;
    }),

  // status must be one of 'pending', 'completed', 'failed'
  body("status")
    .notEmpty()
    .withMessage("status is required")
    .isString()
    .withMessage("status must be a string")
    .isIn(["pending", "completed", "failed"])
    .withMessage("status must be one of 'pending', 'completed', 'failed'"),

  handleValidationErrors,
];

const validateUpdatePaymentData = [
  // sender_id must be an integer if provided
  body("sender_id")
    .optional()
    .isInt()
    .withMessage("sender_id must be an integer"),

  // receiver_id must be an integer if provided
  body("receiver_id")
    .optional()
    .isInt()
    .withMessage("receiver_id must be an integer"),

  // amount must be a positive float with at most 2 decimal places if provided
  body("amount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("amount must be a positive float")
    .custom((value) => {
      if (value) {
        const regex = /^\d+(\.\d{1,2})?$/;
        if (!regex.test(value)) {
          throw new Error("amount must have at most 2 decimal places");
        }
      }
      return true;
    }),

  // status must be one of 'pending', 'completed', 'failed' if provided
  body("status")
    .optional()
    .isString()
    .withMessage("status must be a string")
    .isIn(["pending", "completed", "failed"])
    .withMessage("status must be one of 'pending', 'completed', 'failed'"),

  handleValidationErrors,
];

module.exports = { validateCreatePaymentData, validateUpdatePaymentData };
