import axios from "axios";

let ORIGIN = "";
if (import.meta.env.PROD)
  ORIGIN = "https://advanced-tic-tac-toe-server.onrender.com";

export type Result = {
  [key: string]: string | number;
  player1: string;
  player2: string;
  result: string;
  date: number;
};

export type Error = {
  code: number | undefined;
  errorMessage: string;
};

export async function saveResult(result: Result) {
  return await axios
    .post(`${ORIGIN}/api/results`, result)
    .then((res) => {
      console.log("Saved successfully.");
    })
    .catch((err) => console.log(err));
}

export async function getResults() {
  try {
    const res = await axios.get<Result[]>(`${ORIGIN}/api/results`);
    return res.data;
  } catch (err) {
    return undefined;
  }
}

export async function getPlayerResults(playerName: string) {
  try {
    const res = await axios.get<Result[]>(
      `${ORIGIN}/api/player-results/${playerName}`
    );
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorObject: Error = {
        code: err.response?.status,
        errorMessage: err.response?.data || err.response?.statusText,
      };
      return errorObject;
    } else return undefined;
  }
}
