const { StatusCodes } = require("http-status-codes");
const AsyncWrapper = require("../utils/AsyncWrapper");
const { BadRequestError } = require("../errors");
const Chat = require("../models/chat");
const Message = require("../models/message");

const getMessages = AsyncWrapper(async (req, res) => {
  const { receiverId } = req.params;
  const userId = req.user._id;

  if (!receiverId) {
    throw new BadRequestError("Please specify the id of the recipient");
  }

  let chat = await Chat.findOne({
    users: [{ $in: userId }, { $in: receiverId }],
  });

  if (!chat) {
    chat = await Chat.create({ users: [userId, receiverId] });
  }

  res.status(StatusCodes.OK).json({
    success: true,
    data: chat,
  });
});

const createMessage = AsyncWrapper(async (req, res) => {
  const { receiver, message, chatId } = req.body;
  const sender = req.user._id;

  if (!receiver || !message || !chatId) {
    throw new BadRequestError(
      "make sure to provide these fields [sender, receiver, message, chatId]"
    );
  }

  const newMessage = await Message.create({
    sender,
    receiver,
    message,
    chatId,
  });

  res.status(StatusCodes.CREATED).json({
    success: true,
    data: newMessage,
  });
});

module.exports = {
  createMessage,
  getMessages,
};
