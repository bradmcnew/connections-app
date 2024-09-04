const logger = require("../utils/logger");

// Middleware to log incoming requests
const requestLogger = (req, res, next) => {
  // Log the start time of the request
  const start = Date.now();

  // Log request details
  logger.info({
    message: "Incoming request",
    method: req.method,
    url: req.originalUrl,
    headers: req.headers,
    // Optionally log request body (ensure sensitive data is not logged)
    body: req.body && Object.keys(req.body).length ? req.body : undefined,
  });

  // Capture the response end event
  res.on("finish", () => {
    // Log response details including duration
    logger.info({
      message: "Request completed",
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      // Log the response time
      responseTime: `${Date.now() - start}ms`,
    });
  });

  next();
};

module.exports = requestLogger;
