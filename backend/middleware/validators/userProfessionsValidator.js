// validators/userProfessions.js
const { body, check } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");
const { pool } = require("../../config/db"); // Make sure to import your db configuration

// Helper function to check if a user exists
const userExists = async (user_id) => {
  const result = await pool.query("SELECT 1 FROM users WHERE id = $1", [
    user_id,
  ]);
  return result.rowCount > 0;
};

// Helper function to check if a profession exists
const professionExists = async (profession_id) => {
  const result = await pool.query("SELECT 1 FROM professions WHERE id = $1", [
    profession_id,
  ]);
  return result.rowCount > 0;
};

const validateCreateUserProfessionData = [
  check("user_id")
    .isInt()
    .withMessage("user_id must be an integer")
    .custom(async (user_id) => {
      const exists = await userExists(user_id);
      if (!exists) {
        throw new Error("user_id does not exist");
      }
    }),

  check("profession_id")
    .isInt()
    .withMessage("profession_id must be an integer")
    .custom(async (profession_id) => {
      const exists = await professionExists(profession_id);
      if (!exists) {
        throw new Error("profession_id does not exist");
      }
    }),

  handleValidationErrors,
];

module.exports = {
  validateCreateUserProfessionData,
};
