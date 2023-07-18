const User = require("../models/user");
const Post = require("../models/post");

const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/keys.js");

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, jwt_secret);

    const user = await User.findOne({ _id: payload._id, tokens: token });

    if (!user) {
      return res.status(401).send({ message: "You are not allowed" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .send({ error, message: "There was a problem with the token" });
  }
};

const isSuperAdmin = async (req, res, next) => {
  const admins = ["admin", "superadmin"];

  if (!admins.includes(req.user.role)) {
    return res.status(403).send({
      message: "You do not have permission",
    });
  }

  next();
};

const isAdmin = async (req, res, next) => {
  const admin = "admin";

  if (!admin.includes(req.user.role)) {
    return res.status(403).send({
      message: "You are not allowed",
    });
  }

  next();
};

const isAuthor = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params._id);

    if (post.userId.toString() !== req.user._id.toString()) {
      return reserr
        .status(403)
        .send({ message: "You cannot edit elements that are not yours" });
    }

    next();
  } catch (error) {
    console.error(error);

    return res.status(500).send({
      error,
      message: "There was a problem with the author check",
    });
  }
};

module.exports = { authentication, isSuperAdmin, isAdmin, isAuthor };
