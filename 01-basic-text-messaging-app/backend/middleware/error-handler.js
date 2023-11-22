const { StatusCodes } = require("http-status-codes");
const { CustomErrorAPI } = require("../errors/");
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomErrorAPI) {
    console.log("is instance");
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "something went wrong!",
      error: err,
      stack: err.stack,
    });
  }
};

module.exports = errorHandler;
