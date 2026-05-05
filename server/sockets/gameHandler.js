const { getRandomWord } = require("../game/wordManager");
const { setRoomGame } = require("../game/roomManager");

module.exports = (io, socket) => {
  socket.on("start-game", (roomId) => {
    const word = getRandomWord();

    setRoomGame(roomId, {
      word,
      drawer: socket.id,
    });

    // send word only to drawer
    io.to(socket.id).emit("word", word);

    console.log(`Word for ${roomId}: ${word}`);
  });
};