import { Result } from "./fetch-functions";

export interface Score {
  [key: string]: number;
  player1: number;
  player2: number;
  tie: number;
}

export type FirstTurn = "player1" | "player2" | null;

function helperFunctionsPlayer(
  firstTurn: "player1" | "player2" | null,
  currentSymbol: "X" | "O"
) {
  const winningPatterns = [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  function scoreHandler(
    res: Result[],
    player1Name: string | null,
    player2Name: string | null
  ) {
    let tempScore: Score = { player1: 0, player2: 0, tie: 0 };
    for (let i = 0; i < res.length; i++) {
      const element = res[i];
      for (const key in element) {
        if (key === "winner")
          if (player1Name === res[i][element[key]])
            tempScore = {
              ...tempScore,
              player1: tempScore.player1 + 1,
            };
          else if (player2Name === res[i][element[key]])
            tempScore = {
              ...tempScore,
              player2: tempScore.player2 + 1,
            };
          else tempScore = { ...tempScore, tie: tempScore.tie + 1 };
      }
    }
    return tempScore;
  }

  function checkWinner(playerXMoves: number[], playerOMoves: number[]) {
    for (let i = 0; i < winningPatterns.length; i++) {
      let winningPattern = winningPatterns[i];
      if (
        winningPattern.every((value) => playerXMoves.includes(value)) ||
        winningPattern.every((value) => playerOMoves.includes(value))
      ) {
        return checkCurrentTurn();
      }
    }
    if (playerXMoves.length + playerOMoves.length === 9) return "tie";
    return null;
  }

  function checkCurrentTurn() {
    if (currentSymbol === "X") return firstTurn;
    else {
      if (firstTurn === "player1") return "player2";
      else return "player1";
    }
  }

  return { scoreHandler, checkWinner, checkCurrentTurn };
}

export default helperFunctionsPlayer;
