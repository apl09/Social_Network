const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const CommentSchema = new mongoose.Schema(
  {
    title: String,
    body: String,    
    image:String,

    userId: { type: ObjectId, ref: "User" },
    postId: { type: ObjectId, ref: "Post" },
    likes: [{ type: ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
CommentSchema.methods.toJSON = function () {
  const comment = this._doc;  
  delete comment.createdAt;
  delete comment.updatedAt;  
  delete comment.__v;
  return comment;
};

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
