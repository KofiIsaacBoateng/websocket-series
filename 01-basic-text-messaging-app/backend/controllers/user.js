const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const AsyncWrapper = require("../utils/AsyncWrapper");
const { BadRequestError, NotFoundError } = require("../errors");

module.exports.getAllUsers = AsyncWrapper(async (req, res) => {
  const users = await User.find({
    _id: { $ne: req.userId },
  });

  res.status(StatusCodes.OK).json({
    success: true,
    data: users,
  });
});

module.exports.getUser = AsyncWrapper(async (req, res) => {
  const { _id } = req.params;

  if (!_id) {
    throw new BadRequestError("_id not specified in params");
  }

  const user = await User.findById(_id);

  if (!user) {
    throw new NotFoundError("user not found!");
  }

  res.status(StatusCodes.OK).json({
    success: true,
    data: user,
  });
});
