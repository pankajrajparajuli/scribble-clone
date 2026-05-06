const rooms = {};

function createRoomIfNotExists(roomId) {
  if (!rooms[roomId]) {
    rooms[roomId] = {
      players: [], // { id, name }
      word: null,
      drawer: null
    };
  }
}

function addPlayerToRoom(roomId, socketId, name) {
  const exists = rooms[roomId].players.find(p => p.id === socketId);
  if (exists) return;

  rooms[roomId].players.push({
    id: socketId,
    name
  });
}

function getPlayers(roomId) {
  return rooms[roomId]?.players || [];
}

function removePlayer(roomId, socketId) {
  if (!rooms[roomId]) return;

  rooms[roomId].players = rooms[roomId].players.filter(
    (p) => p.id !== socketId
  );
}

module.exports = {
  createRoomIfNotExists,
  addPlayerToRoom,
  getPlayers,
  removePlayer
};