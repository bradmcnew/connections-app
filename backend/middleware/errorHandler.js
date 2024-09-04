const logger = require("../utils/logger");

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  // Log the error details
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    status: err.status || 500,
  });

  // Set the status code and response message
  const statusCode = err.status || 500;
  const response = {
    status: statusCode,
    message:
      statusCode === 500 && process.env.NODE_ENV !== "development"
        ? "Internal Server Error"
        : err.message || "An unexpected error occurred",
  };

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
