const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");
const { authentication, isAuthor } = require("../middlewares/authentication");

router.get("/id/:_id", PostController.getById);
router.get("/title/:title", PostController.getPostsByName);
router.get("/", PostController.getPostUserComment);

router.post("/create", authentication, PostController.create);

router.put("/id/:_id", authentication, isAuthor, PostController.update);
router.put('/like/:_id', authentication, PostController.like);
router.put('/likes/:_id', authentication, PostController.dislike);

router.delete("/delete/:_id", authentication, PostController.delete);

module.exports = router;
