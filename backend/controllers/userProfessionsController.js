const {
  handleAddAssociation,
  handleRemoveAssociation,
  handleGetAllRelated,
} = require("../utils/junctionControllerHelpers");

// @desc Add a user to a profession
// @route POST /api/user-profession/:userId/:professionId
const addUserToProfession = async (req, res, next) => {
  try {
    const { userId, professionId } = req.params;
    const newAssociation = await handleAddAssociation(
      "user_professions",
      "user_id",
      "profession_id",
      userId,
      professionId
    );
    res.status(201).json(newAssociation);
  } catch (err) {
    next(err);
  }
};

// @desc Remove a user from a profession
// @route DELETE /api/user-profession/:userId/:professionId
const removeUserFromProfession = async (req, res, next) => {
  try {
    const { userId, professionId } = req.params;
    const rowCount = await handleRemoveAssociation(
      "user_professions",
      "user_id",
      "profession_id",
      userId,
      professionId
    );
    if (rowCount === 0) {
      return res.status(404).json({ message: "Association not found" });
    }
    res
      .status(200)
      .json({ message: "User removed from profession successfully." });
  } catch (err) {
    next(err);
  }
};

// @desc Get all users for a profession
// @route GET /api/user-profession/:professionId/users
const getUsersForProfession = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const professions = await handleGetAllRelated(
      "professions",
      "user_professions",
      "profession_id",
      "id",
      userId
    );
    res.status(200).json(professions);
  } catch (err) {
    next(err);
  }
};

// @desc Get all professions for a user
// @route GET /api/user-profession/:userId/professions
const getProfessionsForUser = async (req, res, next) => {
  try {
    const { professionId } = req.params;
    const users = await handleGetAllRelated(
      "users",
      "user_professions",
      "user_id",
      "id",
      professionId
    );
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addUserToProfession,
  removeUserFromProfession,
  getProfessionsForUser,
  getUsersForProfession,
};
