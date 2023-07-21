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

    followers: [{type: ObjectId, ref: "User"}],
    
    avatar: String,
    role: String,
    confirmed: Boolean,
    tokens: [],
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  const user = this._doc;
  delete user.tokens;
  delete user.password;
  delete user.createdAt;
  delete user.updatedAt;
  delete user.role;
  delete user.__v;
  return user;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
