const {
  handleAddAssociation,
  handleRemoveAssociation,
  handleGetAllRelated,
} = require("../utils/junctionControllerHelpers");

// @desc Add a user-profession association
// @route POST /api/user-professions
const addUserToProfession = async (req, res, next) => {
  try {
    const { user_id, profession_id } = req.body;
    console.log("Received userId:", user_id, "professionId:", profession_id);
    const newAssociation = await handleAddAssociation(
      "user_professions",
      "user_id",
      "profession_id",
      user_id,
      profession_id
    );
    res.status(201).json(newAssociation);
  } catch (err) {
    next(err);
  }
};

// Route to remove a user-profession association
// @route DELETE /api/user-professions/users/:userId/professions/:professionId
// @param {string} userId - The ID of the user to be removed
// @param {string} professionId - The ID of the profession from which the user is being removed
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
    if (!rowCount) {
      return res.status(404).json({ message: "Association not found" });
    }
    res
      .status(204)
      .json({ message: "User removed from profession successfully." });
  } catch (err) {
    next(err);
  }
};

// @desc Get all users for a profession
// @route GET /api/user-professions/professions/:professionId/users
const getUsersForProfession = async (req, res, next) => {
  try {
    const { professionId } = req.params;
    const professions = await handleGetAllRelated(
      "users",
      "user_professions",
      "user_id",
      "profession_id",
      professionId
    );
    if (!professions) {
      return res.status(404).json({ message: "Profession not found" });
    }
    res.status(200).json(professions);
  } catch (err) {
    next(err);
  }
};

// @desc Get all professions for a user
// @route GET /api/user-professions/users/:userId/professions
const getProfessionsForUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const users = await handleGetAllRelated(
      "professions",
      "user_professions",
      "profession_id",
      "user_id",
      userId
    );
    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }
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
