const express = require("express");
const { getAllUsers, getUser } = require("../controllers/user");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:_id", getUser);

module.exports = router;
