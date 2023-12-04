const express = require("express");
const router = express.Router();
const {
  createMessage,
  getMessages,
  getConversations,
  getOneConversation,
  updateRecentMessages,
} = require("../controllers/message");
const protect = require("../middleware/auth");

router.get("/:receiverId", protect, getMessages);
router.post("/", protect, createMessage);
router.get("/chat/conversation", protect, getConversations);
router.get("/chat/conversation/:chatId", protect, getOneConversation);
router.patch("/recent/:chatId", protect, updateRecentMessages);

module.exports = router;
