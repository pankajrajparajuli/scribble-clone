const roomHandler = require("./roomHandler");
const drawHandler = require("./drawHandler");
const gameHandler = require("./gameHandler");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    roomHandler(io, socket);
    drawHandler(io, socket);
    gameHandler(io, socket);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};