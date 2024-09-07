const { body, validationResult } = require("express-validator");

// Common validation function to handle errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error("Validation errors: ", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const validateCreateUserData = [
  // username must be a string
  body("username")
    .notEmpty()
    .withMessage("username is required")
    .isString()
    .withMessage("username must be a valid string"),
  // email must be a valid email
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email must be a valid email address"),
  // password must be a string with at least 6 characters
  body("password_hash")
    .notEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("password must be a valid string")
    .isLength({ min: 6 })
    .withMessage("password must have at least 6 characters"),
  // first_name must be a string if provided
  body("first_name")
    .optional()
    .isString()
    .withMessage("first_name must be a valid string if provided"),
  // last_name must be a string if provided
  body("last_name")
    .optional()
    .isString()
    .withMessage("last_name must be a valid string if provided"),
  // profile_picture must be a string if provided
  body("profile_picture")
    .optional()
    .isString()
    .withMessage("profile_picture must be a valid string URL if provided"),
  // date_of_birth must be a valid ISO8601 date if provided
  body("date_of_birth")
    .optional()
    .isISO8601()
    .withMessage("date_of_birth must be a valid date in ISO 8601 format"),
  // address must be a string if provided
  body("address")
    .optional()
    .isString()
    .withMessage("address must be a valid string if provided"),
  // is_active must be a boolean if provided
  body("is_active")
    .optional()
    .isBoolean()
    .withMessage("is_active must be true or false if provided"),
  // is_verified must be a boolean if provided
  body("is_verified")
    .optional()
    .isBoolean()
    .withMessage("is_verified must be true or false if provided"),
  // last_login must be a valid ISO8601 date if provided
  body("last_login")
    .optional()
    .isISO8601()
    .withMessage("last_login must be a valid date in ISO 8601 format"),
  // phone_number must be a valid phone number if provided
  body("phone_number")
    .optional()
    .isMobilePhone("any")
    .withMessage("phone_number must be a valid phone number if provided"),
  handleValidationErrors,
];

// validate optional fields for updating user data
const validateUpdateUserData = [
  // username must be a string if provided
  body("username")
    .optional()
    .isString()
    .withMessage("username must be a valid string if provided"),
  // email must be a valid email if provided
  body("email")
    .optional()
    .isEmail()
    .withMessage("email must be a valid email address if provided"),
  // password must be a string with at least 6 characters if provided
  body("password_hash")
    .optional()
    .isString()
    .withMessage("password must be a valid string if provided")
    .isLength({ min: 6 })
    .withMessage("password must have at least 6 characters if provided"),
  // first_name must be a string if provided
  body("first_name")
    .optional()
    .isString()
    .withMessage("first_name must be a valid string if provided"),
  // last_name must be a string if provided
  body("last_name")
    .optional()
    .isString()
    .withMessage("last_name must be a valid string if provided"),
  // profile_picture must be a string if provided
  body("profile_picture")
    .optional()
    .isString()
    .withMessage("profile_picture must be a valid string URL if provided"),
  // date_of_birth must be a valid ISO8601 date if provided
  body("date_of_birth")
    .optional()
    .isISO8601()
    .withMessage(
      "date_of_birth must be a valid date in ISO 8601 format if provided"
    ),
  // address must be a string if provided
  body("address")
    .optional()
    .isString()
    .withMessage("address must be a valid string if provided"),
  // is_active must be a boolean if provided
  body("is_active")
    .optional()
    .isBoolean()
    .withMessage("is_active must be true or false if provided"),
  // is_verified must be a boolean if provided
  body("is_verified")
    .optional()
    .isBoolean()
    .withMessage("is_verified must be true or false if provided"),
  // last_login must be a valid ISO8601 date if provided
  body("last_login")
    .optional()
    .isISO8601()
    .withMessage(
      "last_login must be a valid date in ISO 8601 format if provided"
    ),
  // phone_number must be a valid phone number if provided
  body("phone_number")
    .optional()
    .isMobilePhone("any")
    .withMessage("phone_number must be a valid phone number if provided"),
  handleValidationErrors,
];

module.exports = {
  validateUpdateUserData,
  validateCreateUserData,
};
