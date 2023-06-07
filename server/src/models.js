const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  player1: String,
  player2: String,
  winner: String,
  date: Date,
});

module.exports = mongoose.model("Result", ResultSchema);
