const Comment = require("../models/comment");
const User = require("../models/user");

const CommentController = {
  async create(req, res) {
    try {
      const userConnected = await User.findById(req.user._id)
      req.body.userId = userConnected._id;

      const comment = await Comment.create(req.body);
      res.status(201).send({ msg: "Comment created correctly", comment });
    } catch (error) {
      console.error(error);
      next(error)
      res
        .status(500)
        .send({ message: "There has been a problem creating the post", error });
    }
  },

  async getById(req, res) {
    try {
      const comment = await Comment.findById(req.params._id);

      res.send(comment);
    } catch (error) {
      console.error(error);
    }
  },

  async update(req, res) {
    try {
      const comment = await Comment.findByIdAndUpdate(
        req.params._id,
        { ...req.body, image: req.file.filename },
        { new: true }
      );
  
      res.send({ message: "Comment successfully updated", comment });
    } catch (error) {
      console.error(error);
    }
  },

  async delete(req, res) {
    try {
      const comment = await Comment.findByIdAndDelete(req.params._id);
      res.send({ message: "Comment deleted", comment });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem trying to remove the comment" });
    }
  },
  async like(req, res) {
    try {
      const comment = await Comment.findById(req.params._id);
      const alreadyLiked = comment.likes.includes(req.user._id)
      if (alreadyLiked) {
        return res
          .status(400)
          .send({ message: "You have already liked this comment" });
      } else {
        const comment = await Comment.findByIdAndUpdate(
          req.params._id,

          { $push: { likes: req.user._id } },

          { new: true }
        );

        res.send(comment);
      }
    } catch (error) {
      console.error(error);

      res.status(500).send({ message: "There was a problem with your like" });
    }
  },

  async dislike(req, res) {
    try {
      const comment = await Comment.findByIdAndUpdate(
        req.params._id,

        { $pull: { likes: req.user._id } },

        { new: true }
      );

      res.send(comment);
    } catch (error) {
      console.error(error);

      res.status(500).send({ message: "There was a problem with your like" });
    }
  },
};

module.exports = CommentController;
