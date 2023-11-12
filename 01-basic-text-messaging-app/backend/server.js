require("dotenv").config();
const app = require("./app");
const http = require("http");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3500;

const server = http.createServer(app);

// connect to mongodb server local
mongoose
  .connect(process.env.MONGO_URI_LOCAL)
  .catch((err) => console.error(err))
  .finally(() => console.log("Connection to DB successful"));

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = server;
