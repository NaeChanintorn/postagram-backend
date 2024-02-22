const express = require("express");
const upload = require("../middlewares/upload");
const {
  updateUser,
  getSuggestedUsers,
  updateUserBio,
  getUserProfileByTargetUserId,
} = require("../controllers/user-controller");
const router = express.Router();

// get target userId

router.get("/:targetUserId/profile", getUserProfileByTargetUserId);

// Edit Profile

router.patch("/", upload.single("profileImage"), updateUser);
router.patch("/bio", updateUserBio);

// Suggested

router.get("/suggest", getSuggestedUsers);

module.exports = router;
