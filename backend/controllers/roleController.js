const {
  handleGetAllRequest,
  handleGetByIdRequest,
  handleDeleteRequest,
  handleCreateRequest,
  handleUpdateRequest,
} = require("../utils/controllerHelpers");

// @desc Create a new role
// @route POST /api/roles
const createRole = async (req, res, next) => {
  try {
    const { role_name } = req.body;
    const newRole = await handleCreateRequest("roles")({
      role_name,
    });
    res.status(201).json(newRole);
  } catch (err) {
    next(err);
  }
};

// @desc Update a role
// @route PUT /api/roles/:id
const updateRole = async (req, res, next) => {
  try {
    const roleId = req.params.id;
    const { role_name } = req.body;
    const updatedrole = await handleUpdateRequest("roles")(roleId, {
      role_name,
    });
    res.status(200).json(updatedrole);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllRoles: handleGetAllRequest("roles"),
  getRoleById: handleGetByIdRequest("roles"),
  createRole: createRole,
  updateRole: updateRole,
  deleteRole: handleDeleteRequest("roles"),
};
