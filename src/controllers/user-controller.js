const fs = require("fs/promises");
const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");
const { uploadImage } = require("../services/upload-service");
const {
  updateUserByid,
  findUserById,
  createFollowByid,
  getFollowByid,
  updateBioById,
} = require("../services/user-service");

exports.updateUser = catchError(async (req, res, next) => {
  if (!req.file) {
    createError("Profile image is required", 400);
  }

  if (req.file.path) {
    const data = await uploadImage(req.file.path);
    fs.unlink(req.file.path);
    await updateUserByid(data, req.user.id);
    res.status(200).json(data);
  }
});

exports.updateUserBio = catchError(async (req, res, next) => {
  if (!req.user.bio) {
    createError("bio is required", 400);
  }

  const { bio } = req.user;
  await updateBioById(bio, req.user.id);
  res.status(200).json({ bio });
});

exports.getSuggestedUsers = catchError(async (req, res, next) => {
  await findUserById(req.user.id);
  res.status(200).json({ user: req.user });
});
