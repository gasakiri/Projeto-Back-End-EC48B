const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "O nome de usuário é obrigatório."],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "O e-mail é obrigatório."],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "A senha é obrigatória."],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
