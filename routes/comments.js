const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/CommentController");
const { authentication } = require("../middlewares/authentication");

router.post("/create", authentication, CommentController.create);
router.put('/id/:_id', authentication, CommentController.update)
router.get('/id/:_id',authentication, CommentController.getById)
router.delete('/id/:_id',authentication, CommentController.delete)

module.exports = router;
