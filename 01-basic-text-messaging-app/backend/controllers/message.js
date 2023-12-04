const { StatusCodes } = require("http-status-codes");
const AsyncWrapper = require("../utils/AsyncWrapper");
const { BadRequestError } = require("../errors");
const Chat = require("../models/chat");
const Message = require("../models/message");

const getMessages = AsyncWrapper(async (req, res) => {
  const { receiverId } = req.params;
  const userId = req.userId;

  if (!receiverId) {
    throw new BadRequestError("Please specify the id of the recipient");
  }

  // get chat the messages belong to
  let chat = await Chat.findOne({
    users: { $all: [userId, receiverId] },
  }).populate("messages");

  // create a new chat if the chat doesn't exist
  if (!chat) {
    chat = await Chat.create({ users: [userId, receiverId] });

    await chat.populate("messages");
  }

  res.status(StatusCodes.OK).json({
    success: true,
    data: chat,
  });
});

const getConversations = AsyncWrapper(async (req, res) => {
  const conversation = await Chat.find({
    users: { $in: [req.userId] },
  });

  res.status(StatusCodes.OK).json({
    success: true,
    data: conversation,
  });
});

const getOneConversation = AsyncWrapper(async (req, res) => {
  const { chatId } = req.params;

  const chat = await Chat.findById(chatId);

  res.status(StatusCodes.OK).json({
    success: true,
    data: chat,
  });
});

const createMessage = AsyncWrapper(async (req, res) => {
  const { receiver, message, chatId } = req.body;
  const sender = req.userId;

  if (!receiver || !message || !chatId) {
    throw new BadRequestError(
      "make sure to provide these fields [ receiver, message, chatId]"
    );
  }

  let newMessage = await Message.create({
    sender,
    receiver,
    message,
    chatId,
  });

  newMessage = await Message.findById(newMessage._id);

  res.status(StatusCodes.CREATED).json({
    success: true,
    data: newMessage,
  });
});

const updateRecentMessages = AsyncWrapper(async (req, res) => {
  const { messageId } = req.body;
  const { chatId } = req.params;
  const chat = await Chat.findByIdAndUpdate(
    { _id: chatId },
    { recent: messageId },
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({
    success: true,
    data: chat,
  });
});

module.exports = {
  createMessage,
  getMessages,
  getConversations,
  getOneConversation,
  updateRecentMessages,
};
