const Post = require("../models/post");


const PostController = {
  async create(req, res) {
    try {
      // const post = await Post.create({...req.body,userId:req.user._id});
      const post = await Post.create(req.body);

      res.status(201).send({ msg: "Post created correctly", post });
    } catch (error) {
      console.error(error);
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
      const post = await Post.findById(req.params._id)
      
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
      console.log(error);
    }
  },
  getPostUserComment(req, res) {
    Post.find(req.params.id)
      .populate({
        path: "users",
        populate: {
          path: "comments",
        },
      })
      .exec()
      .then((post) => res.send(post))
      .catch((err) => {
        console.error(err);
        res.status(500).send(err);
      });
  },
};

module.exports = PostController;
