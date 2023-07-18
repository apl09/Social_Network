const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/CommentController");
const { authentication, isAuthor } = require("../middlewares/authentication");

router.get("/id/:_id", authentication, CommentController.getById);

router.post("/create", authentication, CommentController.create);

router.put("/id/:_id", authentication, isAuthor, CommentController.update);
router.put("/like/:_id", authentication, CommentController.like);
router.put("/like/:_id", authentication,CommentController.like);
router.put("/dislike/:_id", authentication, CommentController.dislike);


router.delete("/id/:_id", authentication, isAuthor, CommentController.delete);

module.exports = router;
