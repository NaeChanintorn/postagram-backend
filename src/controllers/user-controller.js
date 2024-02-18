const fs = require("fs/promises");
const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");
const { uploadImage } = require("../services/upload-service");
const {
  updateUserByid,
  updateBioById,
  RandomUser,
  countAllUsers,
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
  const { id } = req.user;
  const { bio } = req.body;

  if (!bio) {
    createError("bio is required", 400);
  }

  await updateBioById(bio, id);
  res.status(200).json({ bio });
});

exports.getSuggestedUsers = catchError(async (req, res, next) => {
  const countUsers = await countAllUsers();

  const randomUser = await RandomUser(countUsers);

  // delete password;

  for (let i = 0; i < randomUser.length; i++) {
    delete randomUser[i].password;
  }

  res.status(200).json({ randomUser });
});
