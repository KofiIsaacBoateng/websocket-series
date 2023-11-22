const express = require("express");
const router = express.Router();
const { createMessage, getMessages } = require("../controllers/message");
const protect = require("../middleware/auth");

router.get("/:receiverId", protect, getMessages);
router.post("/", protect, createMessage);

module.exports = router;
