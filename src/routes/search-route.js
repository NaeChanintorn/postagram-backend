const express = require("express");
const { searchUser } = require("../controllers/search-controller");

const router = express.Router();

router.post("/", searchUser);

module.exports = router;
