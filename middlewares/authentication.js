const User = require("../models/user");

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

module.exports = { authentication };