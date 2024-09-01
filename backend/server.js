const express = require("express");
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const professionRoutes = require("./routes/profession");
const schoolRoutes = require("./routes/school");
const meetingRoutes = require("./routes/meeting");
const paymentRoutes = require("./routes/payment");
const cors = require("cors");
const PORT = process.env.PORT || 8000;
const logger = require("./tests/logger");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(logger);
app.use(express.urlencoded({ extended: false }));

// more middleware

// connect database

//define routes
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/professions", professionRoutes);
app.use("/api/schools", schoolRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/payments", paymentRoutes);

// error handling middleware
app.use(errorHandler);

app.listen(8000, () => console.log(`server is running in port ${PORT}`));
