const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },

    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "É necessária a identificação do autor"],
    },

    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "É necessária a identificação da postagem"],
    },
  },

  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
