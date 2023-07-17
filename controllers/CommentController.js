const Comment = require("../models/Comment");

const CommentController = {
  async create(req, res) {
    try {
      const comment = await Comment.create(req.body);
      res.status(201).send({ msg: "Comment created correctly", comment });
    } catch (error) {
      console.error(error);
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
      const comment = await Comment.findByIdAndUpdate(req.params._id, req.body, {
        new: true,
      });

      res.send({ message: "comment successfully updated", comment });
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
  

};

module.exports = CommentController;
