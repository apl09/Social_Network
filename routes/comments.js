const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/CommentController");
const { authentication } = require("../middlewares/authentication");

router.post("/create", authentication, CommentController.create);

module.exports = router;
