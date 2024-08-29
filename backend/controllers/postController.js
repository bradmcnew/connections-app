const path = require("path");
const fs = require("fs");

const postsFilePath = path.join(__dirname, "../tests/posts.json");
let posts = JSON.parse(fs.readFileSync(postsFilePath, "utf-8"));

// @desc Get all posts
// @route GET /api/posts
const getAllPosts = (req, res, next) => {
  res.status(200).json(posts);
};

const getPostById = (req, res, next) => {
  const postId = req.params.id;
  const post = posts.find((post) => post.id === postId);
  if (!post) {
    res.status(404).json({ message: "Post not found" });
  }
  res.status(200).json(post);
};

const createPost = (req, res, next) => {
  const { title, content, author } = req.body;
  const newPost = {
    id: (posts.length + 1).toString(),
    title,
    content,
    author,
  };
  posts.push(newPost);
  fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
  res.status(201).json(newPost);
};

const updatePost = (req, res, next) => {
  const postId = req.params.id;
  const { title, content, author } = req.body;
  const post = posts.find((post) => post.id === postId);
  if (!post) {
    res.status(404).json({ message: "Post not found" });
  }
  post.title = title;
  post.content = content;
  post.author = author;
  fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
  res.status(200).json(post);
};

const deletePost = (req, res, next) => {
  const postId = req.params.id;
  const post = posts.find((post) => post.id === postId);
  if (!post) {
    res.status(404).json({ message: "Post not found" });
  }
  posts = posts.filter((post) => post.id !== postId);
  fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
  res.status(200).json({ message: "Post deleted" });
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
