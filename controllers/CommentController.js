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
};

module.exports = CommentController;
