const CustomErrorAPI = require("./custom-api");
const BadRequestError = require("./bad-request");
const NotFoundError = require("./not-found");
const UnAuthorizedError = require("./unauthorized");

module.exports = {
  CustomErrorAPI,
  BadRequestError,
  NotFoundError,
  UnAuthorizedError,
};
