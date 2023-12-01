require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3500;

// connect to mongodb server local
mongoose
  .connect("mongodb://127.0.0.1:27017/chat")
  .then(() => console.log("connection to db successful"))
  .catch((err) => console.error(err));

module.exports = app;
