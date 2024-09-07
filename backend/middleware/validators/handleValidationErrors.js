const { validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error("Validation errors: ", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = handleValidationErrors;
