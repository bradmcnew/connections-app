const {
  handleAddAssociation,
  handleRemoveAssociation,
  handleGetAllRelated,
} = require("../utils/junctionControllerHelpers");

// @desc Add a user to a role
// @route POST /api/user-roles/:userId/:roleId
const addUserToRole = async (req, res, next) => {
  try {
    const { userId, roleId } = req.params;
    const newAssociation = await handleAddAssociation(
      "user_roles",
      "user_id",
      "role_id",
      userId,
      roleId
    );
    res.status(201).json(newAssociation);
  } catch (err) {
    next(err);
  }
};

// @desc Remove a user from a role
// @route DELETE /api/user-roles/users/:userId/roles/:roleId
const removeUserFromRole = async (req, res, next) => {
  try {
    const { userId, roleId } = req.params;
    const rowCount = await handleRemoveAssociation(
      "user_roles",
      "user_id",
      "role_id",
      userId,
      roleId
    );
    if (rowCount === 0) {
      return res.status(404).json({ message: "Association not found" });
    }
    res.status(200).json({ message: "User removed from role successfully." });
  } catch (err) {
    next(err);
  }
};

// @desc Get all users for a role
// @route GET /api/user-roles/roles/:roleId/users
const getUsersForRole = async (req, res, next) => {
  try {
    const { roleId } = req.params;
    const users = await handleGetAllRelated(
      "users",
      "user_roles",
      "user_id",
      "role_id",
      roleId
    );
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// @desc Get all roles for a user
// @route GET /api/user-roles/users/:userId/roles
const getRolesForUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const roles = await handleGetAllRelated(
      "roles",
      "user_roles",
      "role_id",
      "user_id",
      userId
    );
    res.status(200).json(roles);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addUserToRole,
  removeUserFromRole,
  getRolesForUser,
  getUsersForRole,
};
