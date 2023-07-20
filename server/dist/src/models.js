import mongoose from "mongoose";
const ResultSchema = new mongoose.Schema({
    player1: String,
    player2: String,
    winner: String,
    date: Date,
});
export default mongoose.model("Result", ResultSchema);
