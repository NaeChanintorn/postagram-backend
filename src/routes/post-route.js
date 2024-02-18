const express = require("express");
const upload = require("../middlewares/upload");
const {
  createPost,
  getAllPosts,
  editPostByPostId,
  deletePostByPostId,
  createPostVideo,
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
router.patch("/edit-post/:postId", editPostByPostId);
router.patch("/delete-post/:postId", deletePostByPostId); // fake delete

// like
router.post("/:postId/like", createLike);
router.delete("/:postId/unlike", deleteLike);
router.get("/:postId/all-likes", getAllLikesInPost);

// comment
router.post("/:postId/comment", createComment);
router.delete("/:postId/delete-comment/:commentId", deleteComment); // id = commentId
router.get("/:postId/get-comment", getCommentInPost);
router.patch("/:postId/edit-comment/:commentId", editComment);

module.exports = router;
