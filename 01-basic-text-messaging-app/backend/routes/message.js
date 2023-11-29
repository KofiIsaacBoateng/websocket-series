const express = require("express");
const router = express.Router();
const {
  createMessage,
  getMessages,
  getConversation,
  updateRecentMessages,
} = require("../controllers/message");
const protect = require("../middleware/auth");

router.get("/:receiverId", protect, getMessages);
router.post("/", protect, createMessage);
router.get("/chat/conversation", protect, getConversation);
router.patch("/recent/:chatId", updateRecentMessages);

module.exports = router;
