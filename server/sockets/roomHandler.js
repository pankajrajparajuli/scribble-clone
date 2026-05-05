const { createRoomIfNotExists, addPlayerToRoom } = require("../game/roomManager");

module.exports = (io, socket) => {
  socket.on("join-room", (roomId) => {
    socket.join(roomId);

    createRoomIfNotExists(roomId);
    addPlayerToRoom(roomId, socket.id);

    console.log(`${socket.id} joined room ${roomId}`);
  });
};