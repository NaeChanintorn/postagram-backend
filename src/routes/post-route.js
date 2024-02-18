const express = require("express");
const upload = require("../middlewares/upload");
const {
  createPost,
  getAllPosts,
  editPostByPostId,
  deletePostByPostId,
} = require("../controllers/post-controller");
const {
  createLike,
  deleteLike,
  getAllLikesInPost,
} = require("../controllers/like-controller");

const router = express.Router();

// post
router.post("/post-image", upload.single("image"), createPost);
router.get("/get-posts", getAllPosts);
router.patch("/edit-post/:postId", editPostByPostId);
router.patch("/delete-post/:postId", deletePostByPostId); // fake delete

// like
router.post("/:postId/like", createLike);
router.delete("/:postId/unlike", deleteLike);
router.get("/:postId/all-likes", getAllLikesInPost);

module.exports = router;
