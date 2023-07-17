import { FC, useEffect, useState } from "react";

type CellType = {
  i: number;
  winner: string | null;
  currentSymbol: string;
  playerXMoves?: number[];
  playerOMoves?: number[];
  humanMoves?: number[];
  computerMoves?: number[];
  handleCellClick: (cellInput: string | null, i: number) => void;
  computerThinking?: boolean;
};

const Cell: FC<CellType> = ({
  i,
  winner,
  currentSymbol,
  playerXMoves = null,
  playerOMoves = null,
  humanMoves = null,
  computerMoves = null,
  handleCellClick,
  computerThinking = false,
}) => {
  const [cellInput, setCellInput] = useState<string | null>(null);
  const [tempCellInput, setTempCellInput] = useState<string | null>(null);
  const [cellTimeoutId, setCellTimeoutId] = useState<number | undefined>(
    undefined
  );
  const border =
    i === 2 || i === 8
      ? "border-right-left"
      : i === 4 || i === 6
      ? "border-top-bottom"
      : i === 5
      ? "border-all-around"
      : "";

  useEffect(() => {
    if (computerMoves && computerMoves.includes(i))
      setCellInput(currentSymbol === "X" ? "O" : "X");
  }, [computerMoves]);

  useEffect(() => {
    if (
      checkCellReset(playerXMoves, playerOMoves) ||
      checkCellReset(humanMoves, computerMoves)
    ) {
      setCellInput(null);
      setTempCellInput(null);
    }
  }, [playerXMoves, playerOMoves, humanMoves, computerMoves]);

  function checkCellReset(player1: number[] | null, player2: number[] | null) {
    if (player1 && player2 && !player1.includes(i) && !player2.includes(i)) {
      return true;
    } else return false;
  }

  function handleSettingTempCellInput() {
    if (!cellInput && !winner && !computerThinking) {
      const timeoutId = setTimeout(() => {
        setTempCellInput(currentSymbol);
      }, 50);
      setCellTimeoutId(timeoutId);
    }
  }

  function handleRemovingTempCellInput() {
    setTempCellInput(null);
    clearTimeout(cellTimeoutId);
  }

  return (
    <div
      className={`board-cell-wrapper ${border}`}
      onClick={() => {
        if (!cellInput && !computerThinking && !winner)
          setCellInput(currentSymbol);
        handleCellClick(cellInput, i);
      }}
    >
      <button
        onMouseEnter={handleSettingTempCellInput}
        onMouseLeave={handleRemovingTempCellInput}
        className={`board-cell ${
          !winner && !cellInput && !computerThinking && "hoverable-board-cell"
        }`}
      >
        {tempCellInput || cellInput}
      </button>
    </div>
  );
};

export default Cell;
