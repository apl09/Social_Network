const User = require("../models/user");
const transporter = require("../config/nodemailer");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/keys.js");

const UserController = {
  async getUserConnected(req, res) {
    try {
      const getUser = await User.findById(req.user._id)
        .populate("postIds")
        .populate("commentIds");

      res.send({ message: "User: ", getUser });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem with server", error });
    }
  },

  async getUserByUserName(req, res) {
    try {
      if (req.params.username.length > 20) {
        return res.status(400).send("To long search");
      }

      const username = new RegExp(req.params.username, "i");

      const users = await User.find({ username });

      res.send(users);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem with server", error });
    }
  },

  async getUserById(req, res) {
    try {
      const users = await User.findById(req.params._id);
      res.send(users);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem with server", error });
    }
  },

  async register(req, res) {
    try {
      req.body.role = "user";
      const url = 'http://localhost:3000/users/confirm/' + req.body.email;
      await transporter.sendMail({
        to: req.body.email,
        subject: "Confirm your registration",
        html: `<h3>Welcome, you are almost registered</h3>
          <a href="${url}">Click to confirm your registration</a>`,
      });

      const password = await bcrypt.hash(req.body.password, 10);
      confirmed: false;
      const user = await User.create({ ...req.body, password, confirmed: false });

      res.status(201).send({ message: "User successfully registered", user });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "There was a problem with registration", error });
    }
  },

  async login(req, res) {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });

      if (!user) {
        return res.status(400).send({ message: "Incorrect username or password" });
      }

      if (!user.confirmed) {
        return res.status(400).send({ message: "You must confirm your email" });
      }

      const isMatch = bcrypt.compareSync(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).send({ message: "Incorrect username or password" });
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
      res.status(500).send({ message: "There was a problem with login", error });
    }
  },

  

  async logout(req, res) {
    try {
      const token = req.headers.authorization;
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: token },
      });

      res.send({ message: "Successfully logged out" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "There was a problem with logout", error });
    }
  },

  async confirm(req, res) {
    try {
      await User.updateOne(
        { email: req.params.email },
        { $set: { confirmed: true } }
      );
      res.status(201).send("User successfully confirmed");
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "There was a problem with confirmation", error });
    }
  },
};


module.exports = UserController;
