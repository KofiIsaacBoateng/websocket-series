const { StatusCodes } = require("http-status-codes");
const CustomErrorAPI = require("./custom-api");

class NotFoundError extends CustomErrorAPI {
  constructor(message) {
    super(message);

    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
