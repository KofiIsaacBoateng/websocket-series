const express = require("express");
const { getAllUsers, getUser } = require("../controllers/user");
const protect = require("../middleware/auth");

const router = express.Router();

router.get("/", protect, getAllUsers);
router.get("/:_id", protect, getUser);

module.exports = router;
