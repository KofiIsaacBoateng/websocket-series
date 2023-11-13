const { Server } = require("socket.io");
const server = require("../server");

const io = new Server(server);

io.on("connection", (socket) => {
  console.log(`user connected to socket: ${socket.id}`);

  return socket.on("disconnect", () => {
    console.log("user is disconnected");
  });
});
