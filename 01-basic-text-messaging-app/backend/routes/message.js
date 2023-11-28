const express = require("express");
const router = express.Router();
const {
  createMessage,
  getMessages,
  getConversation,
} = require("../controllers/message");
const protect = require("../middleware/auth");

router.get("/:receiverId", protect, getMessages);
router.post("/", protect, createMessage);
router.get("/chat/conversation", protect, getConversation);

module.exports = router;
