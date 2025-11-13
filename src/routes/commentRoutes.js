const express = require("express");
const router = express.Router({ mergeParams: true });
const { requireAuth } = require("../middleware/authMiddleware");
const {
  createComment,
  getComment,
  getAllComments,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");

router.post("/", requireAuth, createComment);

router.get("/", getAllComments);

router.get("/:commentId", getComment);

router.patch("/:commentId", requireAuth, updateComment);

router.delete("/:commentId", requireAuth, deleteComment);

module.exports = router;
