const {
  createFollowById,
  checkFollowById,
  unfollowById,
  checkAllFollow,
  countFollowing,
  countFollower,
} = require("../services/follow-service");
const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");

// Follower = who that need to follow other people , Following = who that got a follow by other people

exports.createFollow = catchError(async (req, res, next) => {
  const { id } = req.user;
  const { followingId } = req.body;

  console.log(req.body);
  if (id === +followingId) {
    createError("You cannot follow yourself", 400);
  }

  const isFollow = await checkFollowById(id, +followingId);

  // console.log(isFollow);

  if (isFollow) {
    createError("You're following this user", 400);
  }

  const data = await createFollowById(id, +followingId);

  res.status(200).json({ data });
});

exports.getAllFollow = catchError(async (req, res, next) => {
  const { id } = req.user;
  const isFollow = await checkAllFollow(id);

  res.status(200).json({ isFollow });
});

exports.getCheckFollow = catchError(async (req, res, next) => {
  const user = req.user;
  const { id } = req.params;
  const isFollow = await checkFollowById(user.id, +id);

  res.status(200).json({ isFollow });
});

exports.unfolllow = catchError(async (req, res, next) => {
  const user = req.user;
  const { id } = req.params;

  if (user.id === id) {
    createError("You cannot unfollow yourself", 400);
  }

  const isFollow = await checkFollowById(+user.id, +id);

  if (!isFollow) {
    createError("You're not following this user", 400);
  }

  const isUnfollow = await unfollowById(+user.id, +id);

  res.status(200).json({ isUnfollow });
});

exports.getCountFollowing = catchError(async (req, res, next) => {
  const { id } = req.params;
  // นับคนที่เราไปฟอล (following) ใน Frontend
  const count = await countFollowing(+id);
  res.status(200).json({ count });
});

exports.getCountFollower = catchError(async (req, res, next) => {
  const { id } = req.params;
  // นับคนที่มาฟอลเรา (follower) ใน Frontend
  const count = await countFollower(+id);
  res.status(200).json({ count });
});
