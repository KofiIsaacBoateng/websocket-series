const { StatusCodes } = require("http-status-codes");

module.exports = notFound = (req, res, next) =>
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: `Route [${req.path}] doesn't exist!`,
  });
