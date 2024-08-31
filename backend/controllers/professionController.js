const {
  handleGetAllRequest,
  handleGetByIdRequest,
  handleDeleteRequest,
  handleCreateRequest,
  handleUpdateRequest,
} = require("../utils/controllerHelpers");

// @desc Create a new profession
// @route POST /api/professions
const createProfession = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newProfession = await handleCreateRequest("professions")({ name });
    res.status(201).json(newProfession);
  } catch (err) {
    next(err);
  }
};

// @desc Update a profession
// @route PUT /api/professions/:id
const updateProfession = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const { name } = req.body;
    const updatedProfession = await handleUpdateRequest("professions")(postId, {
      name,
    });
    res.status(200).json(updatedProfession);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProfessions: handleGetAllRequest("professions"),
  getProfessionById: handleGetByIdRequest("professions"),
  createProfession,
  updateProfession,
  deleteProfession: handleDeleteRequest("professions"),
};
