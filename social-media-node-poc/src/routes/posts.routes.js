const router = require("express").Router();
const Post = require("../controller/users/posts.controller");
const { upload } = require("../helpers/storage");

router.post("/create-post", upload.single("image"), Post.createPost);
router.get("/get-feed-post", Post.getFeedPost);

module.exports = router;
