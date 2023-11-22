const express = require("express");
const router = express.Router();
const { createMessage, getMessages } = require("../controllers/message");

router.get("/:receiverId", getMessages);
router.post("/", createMessage);

module.exports = router;
