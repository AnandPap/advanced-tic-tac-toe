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

export function checkWinner(
  playerXMoves: number[],
  playerOMoves: number[],
  firstMove: "human" | "computer" | null,
  currentSymbol: "X" | "O"
) {
  for (let i = 0; i < winningPatterns.length; i++) {
    let winningPattern = winningPatterns[i];
    if (
      winningPattern.every((value) => playerXMoves.includes(value)) ||
      winningPattern.every((value) => playerOMoves.includes(value))
    )
      return checkCurrentTurn(firstMove, currentSymbol);
  }
  if (playerXMoves.length + playerOMoves.length === 9) return "tie";
  return null;
}

export function checkCurrentTurn(
  firstMove: "human" | "computer" | null,
  currentSymbol: "X" | "O"
) {
  if (
    (firstMove === "human" && currentSymbol === "X") ||
    (firstMove === "computer" && currentSymbol === "O")
  )
    return "human";
  else return "computer";
}

export function makeRandomMove(playerXMoves: number[], playerOMoves: number[]) {
  const availableMoves: number[] = [];
  const madeMoves = [...playerXMoves, ...playerOMoves];
  for (let i = 1; i < 10; i++) {
    if (!madeMoves.includes(i)) availableMoves.push(i);
  }
  const randomNumber = Math.floor(Math.random() * availableMoves.length);
  return availableMoves[randomNumber];
}

export function checkBestMove(
  playerXMoves: number[],
  playerOMoves: number[],
  currentSymbol: "X" | "O"
) {
  const availableMoves: number[] = [];
  const madeMoves = [...playerOMoves, ...playerXMoves];
  for (let i = 1; i < 10; i++) {
    if (!madeMoves.includes(i)) availableMoves.push(i);
  }
  const tempXArray = [...playerXMoves];
  const tempOArray = [...playerOMoves];

  //check for winning move
  for (let i = 0; i < availableMoves.length; i++) {
    if (currentSymbol === "X") {
      tempXArray.push(availableMoves[i]);
      for (let j = 0; j < winningPatterns.length; j++) {
        let winningPattern = winningPatterns[j];
        if (winningPattern.every((value) => tempXArray.includes(value)))
          return availableMoves[i];
      }
      tempXArray.pop();
    } else {
      tempOArray.push(availableMoves[i]);
      for (let j = 0; j < winningPatterns.length; j++) {
        let winningPattern = winningPatterns[j];
        if (winningPattern.every((value) => tempOArray.includes(value)))
          return availableMoves[i];
      }
      tempOArray.pop();
    }
  }

  //check for blocking move
  for (let i = 0; i < availableMoves.length; i++) {
    if (currentSymbol === "O") {
      tempXArray.push(availableMoves[i]);
      for (let j = 0; j < winningPatterns.length; j++) {
        let winningPattern = winningPatterns[j];
        if (winningPattern.every((value) => tempXArray.includes(value)))
          return availableMoves[i];
      }
      tempXArray.pop();
    } else {
      tempOArray.push(availableMoves[i]);
      for (let j = 0; j < winningPatterns.length; j++) {
        let winningPattern = winningPatterns[j];
        if (winningPattern.every((value) => tempOArray.includes(value)))
          return availableMoves[i];
      }
      tempOArray.pop();
    }
  }
  return null;
}
