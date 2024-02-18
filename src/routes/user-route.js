const express = require("express");
const upload = require("../middlewares/upload");
const {
  updateUser,
  getSuggestedUsers,
  createFollow,
  updateUserBio,
} = require("../controllers/user-controller");
const router = express.Router();

// Edit Profile

router.patch("/", upload.single("profileImage"), updateUser);
router.patch("/bio", updateUserBio);
router.get("/suggest", getSuggestedUsers);

// Suggested

// router.get("/", getSuggestedUsers);

module.exports = router;
