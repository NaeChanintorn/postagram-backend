const express = require("express");
const upload = require("../middlewares/upload");
const {
  createPost,
  getAllPosts,
  editPostByPostId,
  deletePostByPostId,
  createPostVideo,
  getAllPostsForEachUser,
} = require("../controllers/post-controller");
const {
  createLike,
  deleteLike,
  getAllLikesInPost,
} = require("../controllers/like-controller");
const {
  createComment,
  deleteComment,
  getCommentInPost,
  editComment,
} = require("../controllers/comment-controller");
const { videoUpload } = require("../middlewares/upload-video");

const router = express.Router();

// post
router.post("/post-image", upload.single("imageOrVideo"), createPost);
router.post("/post-video", videoUpload.single("imageOrVideo"), createPostVideo);
router.get("/get-posts", getAllPosts);
router.get("/:userId/get-post", getAllPostsForEachUser);
router.patch("/edit-post", editPostByPostId);
router.patch("/delete-post", deletePostByPostId); // fake delete

// like
router.post("/like", createLike);
router.delete("/unlike", deleteLike);
router.get("/all-likes", getAllLikesInPost);

// comment
router.post("/comment", createComment); // postId
router.delete("/delete-comment", deleteComment); // id = commentId , postId
router.post("/get-comment", getCommentInPost); // postId
router.patch("/edit-comment", editComment); // postId,commentId

module.exports = router;
