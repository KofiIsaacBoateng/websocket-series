const AsyncWrapper = require("../utils/AsyncWrapper");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnAuthorizedError } = require("../errors");
const jwt = require("jsonwebtoken");

const protect = AsyncWrapper(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthorizedError(
      "Not allowed to perform this activity. Please login"
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "justsomerandomsecret");

    if (!decoded) {
      throw new UnAuthorizedError("Invalid token! Please login.");
    }

    req.userId = decoded._id;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = protect;
