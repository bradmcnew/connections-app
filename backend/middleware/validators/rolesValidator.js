const { body } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const validateCreateRoleData = [
  // role_name must be a non-empty string with a max length of 50 characters
  body("role_name")
    .notEmpty()
    .withMessage("role_name is required")
    .isString()
    .withMessage("role_name must be a string")
    .isLength({ max: 50 })
    .withMessage("role_name must not exceed 50 characters"),

  handleValidationErrors,
];

const validateUpdateRoleData = [
  // role_name must be a string with a max length of 50 characters if provided
  body("role_name")
    .optional()
    .isString()
    .withMessage("role_name must be a string")
    .isLength({ max: 50 })
    .withMessage("role_name must not exceed 50 characters"),

  handleValidationErrors,
];

module.exports = { validateCreateRoleData, validateUpdateRoleData };
