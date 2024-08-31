const {
  handleGetAllRequest,
  handleGetByIdRequest,
  handleDeleteRequest,
  handleCreateRequest,
  handleUpdateRequest,
} = require("../utils/controllerHelpers");

// @desc Create a new post
// @route POST /api/posts
const createPost = async (req, res, next) => {
  try {
    const { user_id, title, content } = req.body;
    const newPost = await handleCreateRequest("posts")({
      user_id,
      title,
      content,
    });
    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
};

// @desc Update a post
// @route PUT /api/posts/:id
const updatePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const { user_id, title, content } = req.body;
    const updatedPost = await handleUpdateRequest("posts")(postId, {
      user_id,
      title,
      content,
    });
    res.status(200).json(updatedPost);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllPosts: handleGetAllRequest("posts"),
  getPostById: handleGetByIdRequest("posts"),
  createPost,
  updatePost,
  deletePost: handleDeleteRequest("posts"),
};
