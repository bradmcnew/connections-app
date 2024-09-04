const winston = require("winston");

// Configure winston for logging
const logger = winston.createLogger({
  level: process.env.NODE_ENV === "development" ? "debug" : "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

module.exports = logger;
