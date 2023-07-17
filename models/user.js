const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
    },

    email: {
      type: String,
      required: [true, "email is required"],
    },

    password: {
      type: String,
      required: [true, "password is required"],
    },
    
    role: String,
    avatar: String,
    tokens: [],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
