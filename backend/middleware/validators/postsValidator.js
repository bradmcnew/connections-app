const { body } = require("express-validator");

const validateCreatePostData = [
  // user_id must be an integer
  body("user_id")
    .notEmpty()
    .withMessage("user_id is required")
    .isInt()
    .withMessage("user_id must be an integer"),
  // title must be a string
  body("title")
    .notEmpty()
    .withMessage("title is required")
    .isString()
    .withMessage("title must be a string"),
  // content must be a string
  body("content")
    .notEmpty()
    .withMessage("content is required")
    .isString()
    .withMessage("content must be a string"),
  // price must be a positive float with at most 2 decimal places
  body("price")
    .notEmpty()
    .withMessage("price is required")
    .isFloat({ min: 0 })
    .withMessage("price must be a positive float")
    .custom((value) => {
      const regex = /^\d+(\.\d{1,2})?$/;
      if (!regex.test(value)) {
        throw new Error("price must have at most 2 decimal places");
      }
      return true;
    }),
];
const validateUpdatePostData = [
  // user_id must be an integer if provided
  body("user_id").optional().isInt().withMessage("user_id must be an integer"),

  // title must be a string if provided
  body("title").optional().isString().withMessage("title must be a string"),

  // content must be a string if provided
  body("content").optional().isString().withMessage("content must be a string"),

  // price must be a positive float with at most 2 decimal places if provided
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("price must be a positive float")
    .custom((value) => {
      if (value) {
        const regex = /^\d+(\.\d{1,2})?$/;
        if (!regex.test(value)) {
          throw new Error("price must have at most 2 decimal places");
        }
      }
      return true;
    }),
];

module.exports = { validateUpdatePostData, validateCreatePostData };
