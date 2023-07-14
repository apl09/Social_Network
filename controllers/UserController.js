const User = require("../models/user");

const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/keys.js");

const UserController = {
  async register(req, res) {
    try {
      const user = await User.create(req.body);

      res.status(201).send({ message: "User successfully registered", user });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem with registration", error });
    }
  },

  async login(req, res) {
    try {
      const user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
      });

      if (!user) {
        return res.status(400).send({ msg: "Incorrect email or password" });
      }

      const token = jwt.sign({ _id: user._id }, jwt_secret);

      if (user.tokens.length > 4) {
        user.tokens.shift();
      }

      user.tokens.push(token);
      await user.save();

      res.send({ message: "Welcome " + user.username, token });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem with registration", error });
    }
  },
};

module.exports = UserController;
