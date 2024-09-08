const { check } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");
const { existsInTable } = require("./helpers");

// Validator for creating a new entry in the user_schools junction table
const validateCreateUserRoleData = [
  check("user_id")
    .isInt()
    .withMessage("user_id must be an integer")
    .custom(async (user_id) => {
      const exists = await existsInTable("users", "id", user_id);
      if (!exists) {
        throw new Error("user_id does not exist");
      }
    }),

  check("role_id")
    .isInt()
    .withMessage("role_id must be an integer")
    .custom(async (school_id) => {
      const exists = await existsInTable("roles", "id", school_id);
      if (!exists) {
        throw new Error("role_id does not exist");
      }
    }),

  handleValidationErrors,
];

module.exports = {
  validateCreateUserRoleData,
};
