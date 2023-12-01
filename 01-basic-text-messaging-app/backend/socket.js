const { Server } = require("socket.io");
const http = require("http");
const app = require("./server");

const server = http.createServer(app);

server.listen(3500, () => console.log("server is listening on port 3500"));

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`user connected to socket: ${socket.id}`);

  return socket.on("disconnect", () => {
    console.log("user is disconnected");
  });
});

module.exports = { io, app, server };
