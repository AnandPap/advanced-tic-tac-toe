import axios from "axios";

const PORT = "https://advanced-tic-tac-toe-server.onrender.com";

export type ResultType = {
  [key: string]: string | number;
  player1: string;
  player2: string;
  result: string;
  date: number;
};

export interface DataType {
  data: ResultType[];
}

export interface ScoreType {
  playerName: string;
  gamesPlayed: number;
  wins: number;
  winRate: string;
}

export async function saveResult(result: ResultType) {
  return await axios
    .post(`${PORT}/api/results`, result)
    .then((res) => {})
    .catch((err) => console.log(err));
}

export async function getResults() {
  try {
    const res: DataType = await axios.get(`${PORT}/api/results`);
    return res.data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}
