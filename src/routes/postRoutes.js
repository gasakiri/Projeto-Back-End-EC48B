const express = require("express");
const router = express.Router();
const commentRouter = require("./commentRoutes");
const {
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

router.post("/", createPost);

router.get("/:id", getPost);

router.patch("/:id", updatePost);

router.delete("/:id", deletePost);

router.use("/:id/comments", commentRouter);

module.exports = router;
