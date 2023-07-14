import axios from "axios";
import { getAxiosErrorObject } from "./error-functions";

let ORIGIN = "";
if (import.meta.env.PROD)
  ORIGIN = "https://advanced-tic-tac-toe-server.onrender.com";

export type Result = {
  [key: string]: string | number;
  player1: string;
  player2: string;
  winner: string;
  date: number;
};

export async function saveResult(result: Result) {
  return await axios
    .post<Result>(`${ORIGIN}/api/results`, result)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return getAxiosErrorObject(err);
    });
}

export async function fetchResults() {
  try {
    const res = await axios.get<Result[]>(`${ORIGIN}/api/results`);
    return res.data;
  } catch (err) {
    return getAxiosErrorObject(err);
  }
}

export async function fetchPlayerResults(playerName: string) {
  try {
    const res = await axios.get<Result[]>(
      `${ORIGIN}/api/player-results/${playerName}`
    );
    return res.data;
  } catch (err) {
    return getAxiosErrorObject(err);
  }
}
