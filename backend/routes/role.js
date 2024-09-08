const express = require("express");
const router = express.Router();

// Import the controller functions for handling role routes
const {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} = require("../controllers/roleController");
// import validation middleware
const {
  validateCreateRoleData,
  validateUpdateRoleData,
} = require("../middleware/validators/rolesValidator");

// Route to get all roles
// @route GET /api/roles
// @desc Fetches a list of all roles
router.get("/", getAllRoles);

// Route to get a single role by its ID
// @route GET /api/roles/:id
// @desc Fetches details of a specific role by ID
// @param {string} id - The ID of the role
router.get("/:id", getRoleById);

// Route to create a new role
// @route POST /api/roles
// @desc Creates a new role entry
// @body {object} role data - The data required to create a new role
router.post("/", validateCreateRoleData, createRole);

// Route to update an existing role
// @route PUT /api/roles/:id
// @desc Updates an existing role's details by ID
// @param {string} id - The ID of the role to update
// @body {object} updated role data - The new data for the role
router.put("/:id", validateUpdateRoleData, updateRole);

// Route to delete a role by its ID
// @route DELETE /api/roles/:id
// @desc Deletes a specific role by ID
// @param {string} id - The ID of the role to delete
router.delete("/:id", deleteRole);

// Export the router to be used in the main app
module.exports = router;
