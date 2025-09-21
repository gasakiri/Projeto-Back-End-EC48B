const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },

    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
