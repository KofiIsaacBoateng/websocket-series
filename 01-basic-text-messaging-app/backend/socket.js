const { Server } = require("socket.io");
const http = require("http");
const app = require("./server");

const server = http.createServer(app);

server.listen(3500, () => console.log("server is listening on port 3500"));

const onlineUsers = {};
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://192.168.43.14:3000"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`user connected to socket: ${socket.id}`);
  let userId;

  socket.on("is-online", (_id) => {
    socket.join(_id); // join room
    userId = _id;
    if (onlineUsers[_id]) return;
    onlineUsers[_id] = socket.id;
    io.emit("online", onlineUsers);
  });

  socket.on("new message", (message) => {
    socket.to(message.receiver._id).emit("incoming", message);
  });

  return socket.on("disconnect", () => {
    delete onlineUsers[userId];
    io.emit("online", onlineUsers);
  });
});

module.exports = { io, app, server };
