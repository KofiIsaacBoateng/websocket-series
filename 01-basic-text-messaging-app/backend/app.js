const express = require("express");
const { StatusCodes } = require("http-status-codes");

const app = express();

app.get("/api/v1", (req, res) => {
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Server is ready for your bullshit!",
  });
});

module.exports = app;
