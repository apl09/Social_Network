const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
    },

    email: {
      type: String,
      match: [/.+\@.+\..+/, "insert a valid email"],
      unique: true,
      required: [true, "please complete all fields"],
    },

    password: {
      type: String,
      required: [true, "password is required"],
    },

    postIds: [{ type: ObjectId, ref: "Post" }],

    commentIds: [{ type: ObjectId, ref: "Comment" }],

    role: String,
    avatar: String,
    tokens: [],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
