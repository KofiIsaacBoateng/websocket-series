const { StatusCodes } = require("http-status-codes");
const { CustomErrorAPI } = require("../errors/");
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomErrorAPI) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "something went wrong!",
    stack: err.stack,
  });
};

module.exports = errorHandler;
