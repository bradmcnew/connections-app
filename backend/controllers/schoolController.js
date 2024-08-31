const {
  handleGetAllRequest,
  handleGetByIdRequest,
  handleDeleteRequest,
  handleCreateRequest,
  handleUpdateRequest,
} = require("../utils/controllerHelpers");

// @desc Create a new post
// @route POST /api/schools
const createSchool = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newSchool = await handleCreateRequest("schools")({ name });
    res.status(201).json(newSchool);
  } catch (err) {
    next(err);
  }
};

// @desc Update a post
// @route PUT /api/schools/:id
const updateSchool = async (req, res, next) => {
  try {
    const schoolId = req.params.id;
    const { name } = req.body;
    const updatedSchool = await handleUpdateRequest("schools")(schoolId, {
      name,
    });
    res.status(200).json(updatedSchool);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllSchools: handleGetAllRequest("schools"),
  getSchoolById: handleGetByIdRequest("schools"),
  createSchool,
  updateSchool,
  deleteSchool: handleDeleteRequest("schools"),
};
