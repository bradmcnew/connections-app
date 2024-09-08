const {
  handleAddAssociation,
  handleRemoveAssociation,
  handleGetAllRelated,
} = require("../utils/junctionControllerHelpers");

// @desc Add a user to a school
// @route POST /api/user-schools/:userId/:schoolId
const addUserToSchool = async (req, res, next) => {
  try {
    const { user_id, school_id } = req.body;
    const newAssociation = await handleAddAssociation(
      "user_schools",
      "user_id",
      "school_id",
      user_id,
      school_id
    );
    res.status(201).json(newAssociation);
  } catch (err) {
    next(err);
  }
};

// @desc Remove a user from a school
// @route DELETE /api/user-schools/:userId/:schoolId
const removeUserFromSchool = async (req, res, next) => {
  try {
    const { userId, schoolId } = req.params;
    const rowCount = await handleRemoveAssociation(
      "user_schools",
      "user_id",
      "school_id",
      userId,
      schoolId
    );
    if (!rowCount) {
      return res.status(404).json({ message: "Association not found" });
    }
    res.status(200).json({ message: "User removed from school successfully." });
  } catch (err) {
    next(err);
  }
};

// @desc Get all users for a school
// @route GET /api/user-schools/:schoolId/users
const getUsersForSchool = async (req, res, next) => {
  try {
    const { schoolId } = req.params;
    const users = await handleGetAllRelated(
      "users",
      "user_schools",
      "user_id",
      "school_id",
      schoolId
    );
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// @desc Get all schools for a user
// @route GET /api/user-schools/:userId/schools
const getSchoolsForUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const schools = await handleGetAllRelated(
      "schools",
      "user_schools",
      "school_id",
      "user_id",
      userId
    );
    res.status(200).json(schools);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addUserToSchool,
  removeUserFromSchool,
  getSchoolsForUser,
  getUsersForSchool,
};
