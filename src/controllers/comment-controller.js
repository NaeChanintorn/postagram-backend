const {
  createCommentService,
  findCommentByCommentId,
  deleteCommentService,
  getCommentService,
  editCommentService,
} = require("../services/comment-service");
const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");

exports.createComment = catchError(async (req, res, next) => {
  const { id } = req.user;
  const { postId } = req.params;
  const { comment } = req.body;

  const data = await createCommentService(comment, +postId, id);
  res.status(200).json({ data });
});

exports.deleteComment = catchError(async (req, res, next) => {
  const { id } = req.user;
  const { postId, commentId } = req.params;

  const isComment = await findCommentByCommentId(+commentId, id, +postId);

  if (!isComment) {
    createError("Is not you're comment");
  }

  await deleteCommentService(commentId);

  res.status(200).json({ message: "Delete success" });
});

exports.getCommentInPost = catchError(async (req, res, next) => {
  const { postId } = req.params;

  const allComments = await getCommentService(+postId);
  res.status(200).json({ allComments });
});

exports.editComment = catchError(async (req, res, next) => {
  const { id } = req.user;
  const { postId, commentId } = req.params;
  const { comment } = req.body;

  const isComment = await findCommentByCommentId(+commentId, id, +postId);

  if (!isComment) {
    createError("Is not you're comment");
  }

  const edit = await editCommentService(comment, +commentId);
  res.status(200).json({ edit });
});
