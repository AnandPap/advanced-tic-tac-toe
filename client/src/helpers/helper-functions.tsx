function helperFunctions(
  playerXMoves: number[],
  playerOMoves: number[],
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

  function checkWinner(firstMove: "human" | "computer") {
    for (let i = 0; i < winningPatterns.length; i++) {
      let winningPattern = winningPatterns[i];
      if (
        winningPattern.every((value) => playerXMoves.includes(value)) ||
        winningPattern.every((value) => playerOMoves.includes(value))
      )
        return checkCurrentTurn(firstMove);
    }
    if (playerXMoves.length + playerOMoves.length === 9) return "tie";
    return null;
  }

  function checkCurrentTurn(firstMove: "human" | "computer" | null) {
    if (
      (firstMove === "human" && currentSymbol === "X") ||
      (firstMove === "computer" && currentSymbol === "O")
    )
      return "human";
    else return "computer";
  }

  function makeRandomMove() {
    const availableMoves: number[] = [];
    const madeMoves = [...playerXMoves, ...playerOMoves];
    for (let i = 1; i < 10; i++) {
      if (!madeMoves.includes(i)) availableMoves.push(i);
    }
    const randomNumber = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomNumber];
  }

  function checkBestMove(type: "winning" | "blocking") {
    const availableMoves: number[] = [];
    const madeMoves = [...playerOMoves, ...playerXMoves];
    for (let i = 1; i < 10; i++) {
      if (!madeMoves.includes(i)) availableMoves.push(i);
    }
    const tempMoves: number[] = [];
    if (
      (currentSymbol === "X" && type === "winning") ||
      (currentSymbol === "O" && type === "blocking")
    )
      tempMoves.push(...playerXMoves);
    else tempMoves.push(...playerOMoves);

    for (let i = 0; i < availableMoves.length; i++) {
      tempMoves.push(availableMoves[i]);
      for (let j = 0; j < winningPatterns.length; j++) {
        let winningPattern = winningPatterns[j];
        if (winningPattern.every((value) => tempMoves.includes(value)))
          return availableMoves[i];
      }
      tempMoves.pop();
    }
    return null;
  }

  return {
    checkWinner,
    checkCurrentTurn,
    makeRandomMove,
    checkBestMove,
  };
}

export default helperFunctions;
