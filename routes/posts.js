const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");
const { authentication, isAuthor } = require("../middlewares/authentication");

router.get("/id/:_id", PostController.getById);
router.get("/title/:title", PostController.getPostsByName);
router.get("/", PostController.getPostUserComment);

router.post("/create", authentication, PostController.create);

router.put("/id/:_id", authentication, isAuthor, PostController.update);

router.delete("/delete/:_id", authentication,isAuthor, PostController.delete);

module.exports = router;
