const express = require("express");
const {
  createFollow,
  getCheckFollow,
  unfolllow,
  getAllFollow,
  getCountFollowing,
  getCountFollower,
} = require("../controllers/follow-controller");
const router = express.Router();

// Follower , Following

router.post("/create-follow", createFollow);
router.get("/count-following/:id", getCountFollowing);
router.get("/count-follower/:id", getCountFollower);
router.get("/", getAllFollow); // getallfollow
router.get("/:id", getCheckFollow); // get specific user
router.delete("/:id", unfolllow);

module.exports = router;
