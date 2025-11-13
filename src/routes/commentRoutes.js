const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  createComment,
  getComment,
  getAllComments,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");

router.post("/", createComment);

router.get("/", getAllComments);

router.get("/:id", getComment);

router.patch("/:id", updateComment);

router.delete("/:id", deleteComment);

module.exports = router;
