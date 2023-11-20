const { StatusCodes } = require("http-status-codes");
const CustomErrorAPI = require("./custom-api");

class UnAuthorizedError extends CustomErrorAPI {
  constructor(message) {
    super(message);

    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnAuthorizedError;
