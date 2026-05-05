const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"]
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // JOIN ROOM
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`${socket.id} joined room ${roomId}`);
  });

  // DRAW inside room only
  socket.on("draw", ({ roomId, data }) => {
    socket.to(roomId).emit("draw", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(5001, () => {
  console.log("🔥 Server running on port 5001");
});