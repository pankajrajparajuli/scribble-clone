const words = require("../data/words");

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

module.exports = { getRandomWord };