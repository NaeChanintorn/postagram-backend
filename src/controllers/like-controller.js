const {
  createLikeService,
  findLikeByUserId,
  deleteLikeService,
  getAllLikeService,
} = require("../services/like-service");
const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");

exports.createLike = catchError(async (req, res, next) => {
  const { id } = req.user;
  const { postId } = req.params;

  const isLike = await findLikeByUserId(+postId, id);

  // if postId has like by userId => cant like anymore
  if (isLike) {
    createError(`You already like this post`, 400);
  }

  const like = await createLikeService(+postId, id);

  res.status(200).json({ like });
});

exports.deleteLike = catchError(async (req, res, next) => {
  const { id } = req.user;
  const { postId } = req.params;

  const isLike = await findLikeByUserId(+postId, id);

  // if postId has like by userId => cant like anymore
  if (!isLike) {
    createError(`You not even like this post`, 400);
  }

  await deleteLikeService(+postId, id);

  res.status(200).json({ message: "Unlike success" });
});

exports.getAllLikesInPost = catchError(async (req, res, next) => {
  const { postId } = req.params;

  const allLikes = await getAllLikeService(+postId);
  res.status(200).json({ allLikes });
});
