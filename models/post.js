const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    body: {
      type: String,
      required: [true, "Body is required"],
    },
    
    image:String,
    likes: [{ type: ObjectId, ref: "User" }],
    userId: { type: ObjectId, ref: "User" },
    commentIds: [{ type: ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

PostSchema.methods.toJSON = function () {
  const post = this._doc;  
  delete post.createdAt;
  delete post.updatedAt;  
  delete post.__v;
  return post;
};

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
