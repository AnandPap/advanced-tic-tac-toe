function helperFunctionsComputer(
  humanMoves: number[],
  computerMoves: number[]
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

  function checkWinner(movesArray: number[]) {
    for (let i = 0; i < winningPatterns.length; i++) {
      let winningPattern = winningPatterns[i];
      if (winningPattern.every((value) => movesArray.includes(value)))
        return true;
    }
    return false;
  }

  function getAvailableMoves() {
    const availableMoves: number[] = [];
    const madeMoves = [...humanMoves, ...computerMoves];
    for (let i = 1; i < 10; i++) {
      if (!madeMoves.includes(i)) availableMoves.push(i);
    }
    return availableMoves;
  }

  function randomMove() {
    const availableMoves = getAvailableMoves();
    const randomNumber = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomNumber];
  }

  function checkBestMove(type: "winning" | "blocking") {
    const availableMoves = getAvailableMoves();
    const tempMoves: number[] = [];
    if (type === "winning") tempMoves.push(...computerMoves);
    else tempMoves.push(...humanMoves);
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

  function checkIfFirstAdjacent() {
    if (
      (computerMoves[0] === 1 &&
        (humanMoves[0] === 2 || humanMoves[0] === 4)) ||
      (computerMoves[0] === 3 &&
        (humanMoves[0] === 2 || humanMoves[0] === 6)) ||
      (computerMoves[0] === 7 &&
        (humanMoves[0] === 4 || humanMoves[0] === 8)) ||
      (computerMoves[0] === 9 && (humanMoves[0] === 6 || humanMoves[0] === 8))
    )
      return true;
    else return false;
  }

  function responseToAdjacentMove() {
    if (
      (computerMoves[0] === 1 && humanMoves[0] === 2) ||
      (computerMoves[0] === 9 && humanMoves[0] === 6)
    )
      return 7;
    else if (
      (computerMoves[0] === 3 && humanMoves[0] === 2) ||
      (computerMoves[0] === 7 && humanMoves[0] === 4)
    )
      return 9;
    else if (
      (computerMoves[0] === 3 && humanMoves[0] === 6) ||
      (computerMoves[0] === 7 && humanMoves[0] === 8)
    )
      return 1;
    else if (
      (computerMoves[0] === 1 && humanMoves[0] === 4) ||
      (computerMoves[0] === 9 && humanMoves[0] === 8)
    )
      return 3;
    return randomMove();
  }

  function makeCornerMove(type?: string) {
    const availableMoves = getAvailableMoves();
    const cornerMoves = [1, 3, 7, 9];
    if (type === "adjacentCorner") {
      for (let i = 0; i < cornerMoves.length; i++) {
        if (cornerMoves[i] + humanMoves[0] === 10) return cornerMoves[i];
      }
    } else {
      const availableBestMoves = cornerMoves.filter((element) =>
        availableMoves.includes(element)
      );
      return availableBestMoves[
        Math.floor(Math.random() * availableBestMoves.length)
      ];
    }
    return randomMove();
  }

  function makeAdjacentMove() {
    if (humanMoves[0] === 2) return [1, 3][Math.floor(Math.random() * 2)];
    if (humanMoves[0] === 4) return [1, 7][Math.floor(Math.random() * 2)];
    if (humanMoves[0] === 6) return [3, 9][Math.floor(Math.random() * 2)];
    if (humanMoves[0] === 8) return [7, 9][Math.floor(Math.random() * 2)];
    return randomMove();
  }

  return {
    checkWinner,
    randomMove,
    checkBestMove,
    checkIfFirstAdjacent,
    responseToAdjacentMove,
    makeCornerMove,
    makeAdjacentMove,
  };
}

export default helperFunctionsComputer;
