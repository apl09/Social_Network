const User = require("../models/user");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/keys.js");

const UserController = {
  async register(req, res) {
    try {
      req.body.role = "user";
      const password = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({ ...req.body, password });

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
      });

      if (!user) {
        return res.status(400).send({ msg: "Incorrect username or password" });
      }
      const isMatch = bcrypt.compareSync(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).send({ msg: "Incorrect username or password" });
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

  async logout(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization },
      });

      res.send({ message: "Successfully logout" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem with the logout", error });
    }
  },
};

module.exports = UserController;
