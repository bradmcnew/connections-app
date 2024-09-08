const { body } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const validateCreateProfessionData = [
  // name must be a non-empty string with a max length of 100 characters
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string")
    .isLength({ max: 100 })
    .withMessage("name must not exceed 100 characters"),

  handleValidationErrors,
];

const validateUpdateProfessionData = [
  // name must be a non-empty string with a max length of 100 characters if provided
  body("name")
    .optional()
    .isString()
    .withMessage("name must be a string")
    .isLength({ max: 100 })
    .withMessage("name must not exceed 100 characters"),

  handleValidationErrors,
];

module.exports = { validateCreateProfessionData, validateUpdateProfessionData };
