const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
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

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;