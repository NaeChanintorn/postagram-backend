const express = require("express");
const {
  createFollow,
  getCheckFollow,
  unfolllow,
  getAllFollow,
} = require("../controllers/follow-controller");
const router = express.Router();

// Follower , Following

router.post("/create-follow", createFollow);
router.get("/", getAllFollow); // getallfollow
router.get("/:id", getCheckFollow); // get specific user
router.delete("/:id", unfolllow);

module.exports = router;
