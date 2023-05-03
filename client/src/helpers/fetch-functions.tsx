import axios from "axios";

let ORIGIN = "";
if (import.meta.env.PROD)
  ORIGIN = "https://advanced-tic-tac-toe-server.onrender.com";

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
    .post(`${ORIGIN}/api/results`, result)
    .then((res) => {
      console.log("Saved successfully.");
    })
    .catch((err) => console.log(err));
}

export async function getResults() {
  try {
    const res: DataType = await axios.get(`${ORIGIN}/api/results`);
    return res.data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}
