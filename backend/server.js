const express = require("express");
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const cors = require("cors");
const port = process.env.PORT || 8000;
const logger = require("./tests/logger");

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

app.listen(8000, () => console.log(`server is running in port ${port}`));
