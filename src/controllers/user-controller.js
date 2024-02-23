const fs = require("fs/promises");
const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");
const { uploadImage } = require("../services/upload-service");
const {
  updateUserByid,
  updateBioById,
  RandomUser,
  findUserById,
  countAllUsers,
} = require("../services/user-service");
const {
  checkFollowById,
  checkAllFollow,
} = require("../services/follow-service");

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

//  Suggested Users

exports.getSuggestedUsers = catchError(async (req, res, next) => {
  const { id } = req.user;

  const isfollowing = await checkAllFollow(id);

  const countUsers = await countAllUsers();

  const randomUser = await RandomUser(id, countUsers, isfollowing.followingId);

  // delete password;

  for (let i = 0; i < randomUser.length; i++) {
    delete randomUser[i].password;
  }
  res.status(200).json({ randomUser });
});

// exports.getAllUsers = catchError(async (req, res, next) => {
//   const { targetUserId } = req.params;
//   const allUsers = await findUserById(+targetUserId);
//   if (!allUsers) {
//     createError("User was not found!", 400);
//   }
//   delete allUsers.password;
//   next();
// });

exports.getUserProfileByTargetUserId = catchError(async (req, res, next) => {
  const { targetUserId } = req.params;
  const profileUser = await findUserById(+targetUserId);
  if (!profileUser) {
    createError("User was not found!", 400);
  }
  delete profileUser.password;
  res.status(200).json({ profileUser });
});
