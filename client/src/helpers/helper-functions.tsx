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

  function getAvailableMoves() {
    const availableMoves: number[] = [];
    const madeMoves = [...playerXMoves, ...playerOMoves];
    for (let i = 1; i < 10; i++) {
      if (!madeMoves.includes(i)) availableMoves.push(i);
    }
    return availableMoves;
  }

  function makeRandomMove() {
    const availableMoves = getAvailableMoves();
    const randomNumber = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomNumber];
  }

  function checkBestMove(type: "winning" | "blocking") {
    const availableMoves = getAvailableMoves();
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

  function checkIfAdjacent() {
    if (
      (playerXMoves[0] === 1 &&
        (playerOMoves[0] === 2 || playerOMoves[0] === 4)) ||
      (playerXMoves[0] === 3 &&
        (playerOMoves[0] === 2 || playerOMoves[0] === 6)) ||
      (playerXMoves[0] === 7 &&
        (playerOMoves[0] === 4 || playerOMoves[0] === 8)) ||
      (playerXMoves[0] === 9 &&
        (playerOMoves[0] === 6 || playerOMoves[0] === 8))
    )
      return true;
    else return false;
  }

  function makeAdjacentMove() {
    if (
      (playerXMoves[0] === 1 && playerOMoves[0] === 2) ||
      (playerXMoves[0] === 9 && playerOMoves[0] === 6)
    )
      return 7;
    else if (
      (playerXMoves[0] === 3 && playerOMoves[0] === 2) ||
      (playerXMoves[0] === 7 && playerOMoves[0] === 4)
    )
      return 9;
    else if (
      (playerXMoves[0] === 3 && playerOMoves[0] === 6) ||
      (playerXMoves[0] === 7 && playerOMoves[0] === 8)
    )
      return 1;
    else if (
      (playerXMoves[0] === 1 && playerOMoves[0] === 4) ||
      (playerXMoves[0] === 9 && playerOMoves[0] === 8)
    )
      return 3;
    else return makeRandomMove();
  }

  function makeCornerMove(type?: string) {
    const availableMoves = getAvailableMoves();
    const bestMoves = [1, 3, 7, 9];
    if (type === "random") return bestMoves[Math.floor(Math.random() * 4)];
    const bestMove = availableMoves.find(
      (element) =>
        bestMoves.includes(element) &&
        (type === "adjacent" ? element + playerXMoves[0] !== 10 : true)
    );
    if (bestMove) return bestMove;
    else return makeRandomMove();
  }

  return {
    checkWinner,
    checkCurrentTurn,
    makeRandomMove,
    checkBestMove,
    checkIfAdjacent,
    makeAdjacentMove,
    makeCornerMove,
  };
}

export default helperFunctions;
