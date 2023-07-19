const Post = require("../models/post");

const PostController = {
  async create(req, res, next) {
    try {
      const post = await Post.create({ ...req.body, userId: req.user._id });

      res.status(201).send({ msg: "Post created correctly", post });
    } catch (error) {
      console.error(error);
      next(error);
      res
        .status(500)
        .send({ message: "There has been a problem creating the post", error });
    }
  },

  async update(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(req.params._id, req.body, {
        new: true,
      });

      res.send({ message: "post successfully updated", post });
    } catch (error) {
      console.error(error);
    }
  },

  async delete(req, res) {
    try {
      const post = await Post.findByIdAndDelete(req.params._id);
      res.send({ message: "Post deleted", post });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem trying to remove the post" });
    }
  },

  async getById(req, res) {
    try {
      const post = await Post.findById(req.params._id);

      res.send(post);
    } catch (error) {
      console.error(error);
    }
  },

  async getPostsByName(req, res) {
    try {
      if (req.params.title.length > 20) {
        return res.status(400).send("To long search");
      }

      const title = new RegExp(req.params.title, "i");

      const posts = await Post.find({ title });

      res.send(posts);
    } catch (error) {
      console.error(error);

      res.status(500).send({ message: "There was a problem" });
    }
  },

  async getPostUserComment(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const post = await Post.find()
        .populate("userId")
        // .populate("commentIds")
        .limit(parseInt(limit))
        .skip((page - 1) * limit)
        .exec();

      res.send(post);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async like(req, res) {
    try {
      const post = await Post.findById(req.params._id);
      const alreadyLiked = post.likes.includes(req.user._id);
      if (alreadyLiked) {
        return res
          .status(400)
          .send({ message: "You have already liked this post" });
      } else {
        const post = await Post.findByIdAndUpdate(
          req.params._id,

          { $push: { likes: req.user._id } },

          { new: true }
        );

        res.send(post);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "There was a problem with your like" });
    }
  },

  async dislike(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params._id,

        { $pull: { likes: req.user._id } },

        { new: true }
      );

      res.send(post);
    } catch (error) {
      console.error(error);

      res.status(500).send({ message: "There was a problem with your like" });
    }
  },

  async getAll(req, res) {
    try {
      const posts = await Post.find();

      res.send(posts);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "There was a problem" });
    }
  },

};

module.exports = PostController;
