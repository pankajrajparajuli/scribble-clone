const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const socketHandler = require("./sockets");

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

socketHandler(io);

module.exports = server;