const express = require("express");
const router = express.Router();
const commentRouter = require("./commentRoutes");
const { requireAuth } = require("../middleware/authMiddleware");
const {
  createPost,
  getPost,
  getAllPosts,
  updatePost,
  deletePost,
} = require("../controllers/postController");

router.post("/", requireAuth, createPost);

router.get("/:id", getPost);

router.get("/", getAllPosts);

router.patch("/:id", requireAuth, updatePost);

router.delete("/:id", requireAuth, deletePost);

router.use("/:id/comments", commentRouter);

module.exports = router;
