const { check } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");
const { existsInTable } = require("./helpers");

// Validator for creating a new entry in the user_schools junction table
const validateCreateUserSchoolData = [
  check("user_id")
    .isInt()
    .withMessage("user_id must be an integer")
    .custom(async (user_id) => {
      const exists = await existsInTable("users", "id", user_id);
      if (!exists) {
        throw new Error("user_id does not exist");
      }
    }),

  check("school_id")
    .isInt()
    .withMessage("school_id must be an integer")
    .custom(async (school_id) => {
      const exists = await existsInTable("schools", "id", school_id);
      if (!exists) {
        throw new Error("school_id does not exist");
      }
    }),

  handleValidationErrors,
];

module.exports = {
  validateCreateUserSchoolData,
};
