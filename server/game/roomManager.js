const rooms = {};

function createRoomIfNotExists(roomId) {
  if (!rooms[roomId]) {
    rooms[roomId] = {
      players: [],
      word: null,
      drawer: null
    };
  }
}

function addPlayerToRoom(roomId, socketId) {
  rooms[roomId].players.push(socketId);
}

function setRoomGame(roomId, data) {
  if (!rooms[roomId]) return;
  rooms[roomId] = { ...rooms[roomId], ...data };
}

module.exports = {
  createRoomIfNotExists,
  addPlayerToRoom,
  setRoomGame
};