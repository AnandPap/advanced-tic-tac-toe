import axios from "axios";
import { getAxiosErrorObject } from "./error-functions";

export type Result = {
  [key: string]: string | number;
  player1: string;
  player2: string;
  winner: string;
  date: number;
};

export async function fetchScores(player1Name: string, player2Name: string) {
  try {
    const res = await axios.get<Result[]>(`/api/scores`, {
      params: { player1: player1Name, player2: player2Name },
    });
    return res.data;
  } catch (err) {
    return getAxiosErrorObject(err);
  }
}

export async function saveResult(result: Result) {
  return await axios
    .post<Result>(`/api/results`, result)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return getAxiosErrorObject(err);
    });
}

export async function fetchResults() {
  try {
    const res = await axios.get<Result[]>(`/api/results`);
    return res.data;
  } catch (err) {
    return getAxiosErrorObject(err);
  }
}

export async function fetchPlayerResults(playerName: string) {
  try {
    const res = await axios.get<Result[]>(`/api/player-results/${playerName}`);
    return res.data;
  } catch (err) {
    return getAxiosErrorObject(err);
  }
}
