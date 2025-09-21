const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },

  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  postDate: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
