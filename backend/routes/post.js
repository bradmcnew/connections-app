const express = require("express");
const router = express.Router();
// Import the post validation middleware
const {
  validateCreatePostData,
  validateUpdatePostData,
} = require("../middleware/validators/postsValidator");
// Import the controller functions for handling post routes
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

// Route to get all posts
// @route GET /api/posts
// @desc Fetches a list of all posts
router.get("/", getAllPosts);

// Route to get a single post by its ID
// @route GET /api/posts/:id
// @desc Fetches details of a specific post by ID
// @param {string} id - The ID of the post
router.get("/:id", getPostById);

// Route to create a new post
// @route POST /api/posts
// @desc Creates a new post entry
// @body {object} post data - The data required to create a new post
router.post("/", validateCreatePostData, createPost);

// Route to update an existing post
// @route PUT /api/posts/:id
// @desc Updates an existing post's details by ID
// @param {string} id - The ID of the post to update
// @body {object} updated post data - The new data for the post
router.put("/:id", validateUpdatePostData, updatePost);

// Route to delete a post by its ID
// @route DELETE /api/posts/:id
// @desc Deletes a specific post by ID
// @param {string} id - The ID of the post to delete
router.delete("/:id", deletePost);

// Export the router to be used in the main app
module.exports = router;
