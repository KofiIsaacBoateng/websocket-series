require("dotenv").config();
const app = require("./app");
const http = require("http");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3500;

const server = http.createServer(app);

// connect to mongodb server local
mongoose
  .connect("mongodb://127.0.0.1:27017/chat")
  .then(() => console.log("connection to db successful"))
  .catch((err) => console.error(err));

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = server;
