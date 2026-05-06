const {
  createRoomIfNotExists,
  addPlayerToRoom,
  getPlayers,
  removePlayer,
} = require("../game/roomManager");

module.exports = (io, socket) => {
  socket.on("join-room", ({ roomId, name }) => {
    socket.join(roomId);

    createRoomIfNotExists(roomId);
    addPlayerToRoom(roomId, socket.id, name);

    console.log("JOIN:", name, roomId);

    const players = getPlayers(roomId);
    console.log("PLAYERS:", players); // 👈 DEBUG

    io.to(roomId).emit("players", players);

    socket.roomId = roomId;
  });

  socket.on("disconnect", () => {
    const roomId = socket.roomId;
    if (!roomId) return;

    removePlayer(roomId, socket.id);
    io.to(roomId).emit("players", getPlayers(roomId));
  });
};