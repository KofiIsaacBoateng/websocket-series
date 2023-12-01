const { BadRequestError, UnAuthorizedError } = require("../errors");
const User = require("../models/user");
const AsyncWrapper = require("../utils/AsyncWrapper");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const registerToken = (_id) => {
  return jwt.sign({ _id }, "justsomerandomsecret", { expiresIn: "1h" });
};

const sendLoginCredentials = (user, res, statusCode) => {
  // remove password before sending credentials
  user.password = undefined;

  /**** sign token */
  const token = registerToken(user._id);

  res.status(statusCode).json({
    success: true,
    data: user,
    token,
  });
};

module.exports.register = AsyncWrapper(async (req, res) => {
  const { username, password, confirmPassword, name } = req.body;

  if (!username || !password || !confirmPassword || !name) {
    throw new BadRequestError(
      "username, password, and confirm password cannot be empty"
    );
  }

  const exists = await User.findOne({ username });

  if (exists) {
    throw new UnAuthorizedError("Account already exists! Please login.");
  }

  // auto set user profile
  const profile = `https://avatar.iran.liara.run/public?username=${username}`;

  const user = await User.create({
    name,
    username,
    password,
    confirmPassword,
    profile,
  });

  // send login credentials
  sendLoginCredentials(user, res, StatusCodes.CREATED);
});

module.exports.login = AsyncWrapper(async (req, res) => {
  const { password, username } = req.body;

  // verify inputs
  if (!password || !username) {
    throw new BadRequestError("username and password is required");
  }

  // check if user exists
  const user = await User.findOne({ username }).select("+password");

  if (!user) {
    throw new UnAuthorizedError("Invalid username or password");
  }

  // verify password
  const verifiedPassword = await user.verifyPassword(password, user.password);

  if (!verifiedPassword) {
    throw new UnAuthorizedError("Invalid username or password");
  }

  // send login credentials
  sendLoginCredentials(user, res, StatusCodes.OK);
});

module.exports.usernameExists = AsyncWrapper(async (req, res) => {
  const { username } = req.body;

  if (!username) throw new BadRequestError("username isn't provided");

  const user = await User.findOne({ username });

  res.status(StatusCodes.OK).json({
    success: true,
    exists: user ? true : false,
  });
});
