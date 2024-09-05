const express = require("express");
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const professionRoutes = require("./routes/profession");
const schoolRoutes = require("./routes/school");
const meetingRoutes = require("./routes/meeting");
const paymentRoutes = require("./routes/payment");
const roleRoutes = require("./routes/role");
const userProfessionRoutes = require("./routes/userProfession");
const userRoleRoutes = require("./routes/userRole");
const userSchoolRoutes = require("./routes/userSchool");
const cors = require("cors");

const logger = require("./middleware/requestLogger");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware Setup
// Enable Cross-Origin Resource Sharing (CORS) for handling cross-origin requests
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Custom logging middleware for request logging
app.use(logger);

// Parse incoming URL-encoded data with extended option set to false
app.use(express.urlencoded({ extended: false }));

// Connect to database
// (Database connection logic should be added here, if applicable)

// Route Definitions
// Define routes for handling post-related requests
app.use("/api/posts", postRoutes);

// Define routes for handling user-related requests
app.use("/api/users", userRoutes);

// Define routes for handling profession-related requests
app.use("/api/professions", professionRoutes);

// Define routes for handling school-related requests
app.use("/api/schools", schoolRoutes);

// Define routes for handling meeting-related requests
app.use("/api/meetings", meetingRoutes);

// Define routes for handling payment-related requests
app.use("/api/payments", paymentRoutes);

// Define routes for handling role-related requests
app.use("/api/roles", roleRoutes);

// Define routes for handling user-profession associations
app.use("/api/user-professions", userProfessionRoutes);

// Define routes for handling user-role associations
app.use("/api/user-roles", userRoleRoutes);

// Define routes for handling user-school associations
app.use("/api/user-schools", userSchoolRoutes);

// Error Handling Middleware
// Custom error handling middleware to catch and respond to errors
app.use(errorHandler);

module.exports = app;
