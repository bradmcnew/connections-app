const {
  handleGetAllRequest,
  handleGetByIdRequest,
  handleDeleteRequest,
  handleCreateRequest,
  handleUpdateRequest,
} = require("../utils/controllerHelpers");

// @desc Create a new post
// @route POST /api/users
const createUser = async (req, res, next) => {
  try {
    const {
      username,
      email,
      password_hash,
      first_name,
      last_name,
      profile_picture,
      date_of_birth,
      phone_number,
      address,
      is_active,
      is_verified,
      roles,
      last_login,
    } = req.body;
    const newUser = await handleCreateRequest("users")({
      username,
      email,
      password_hash,
      first_name,
      last_name,
      profile_picture,
      date_of_birth,
      phone_number,
      address,
      is_active,
      is_verified,
      roles,
      last_login,
    });
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

// @desc Update a post
// @route PUT /api/users/:id
const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const {
      username,
      email,
      password_hash,
      first_name,
      last_name,
      profile_picture,
      date_of_birth,
      phone_number,
      address,
      is_active,
      is_verified,
      roles,
      last_login,
    } = req.body;
    const updatedUser = await handleUpdateRequest("users")(userId, {
      username,
      email,
      password_hash,
      first_name,
      last_name,
      profile_picture,
      date_of_birth,
      phone_number,
      address,
      is_active,
      is_verified,
      roles,
      last_login,
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllUsers: handleGetAllRequest("users"),
  getUserById: handleGetByIdRequest("users"),
  createUser,
  updateUser,
  deleteUser: handleDeleteRequest("users"),
};
