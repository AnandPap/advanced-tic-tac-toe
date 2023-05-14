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

export type ResultsDataType = {
  data: ResultType[];
};
export type ErrorType = {
  code: number | undefined;
  errorMessage: string;
};

export interface ScoreType {
  [key: string]: string | number;
  playerName: string;
  gamesPlayed: number;
  wins: number;
  winRate: number;
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
    const res: ResultsDataType = await axios.get(`${ORIGIN}/api/results`);
    return res.data;
  } catch (err) {
    return undefined;
  }
}

export async function getPlayerResults(playerName: string) {
  try {
    const res: ResultsDataType = await axios.get(
      `${ORIGIN}/api/player-results/${playerName}`
    );
    console.log(res);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorObject: ErrorType = {
        code: err.response?.status,
        errorMessage: err.response?.data,
      };
      return errorObject;
    } else return undefined;
  }
}
