import { FC, useEffect, useState } from "react";

type CellType = {
  i: number;
  winner: string | null;
  currentSymbol: string;
  playerXMoves: number[];
  playerOMoves: number[];
  handleCellClick: (cellInput: string | null, i: number) => void;
  computerThinking?: boolean;
};

const Cell: FC<CellType> = ({
  i,
  winner,
  currentSymbol,
  playerXMoves,
  playerOMoves,
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
    if ((playerXMoves.includes(i) || playerOMoves.includes(i)) && !cellInput)
      setCellInput(currentSymbol);
    else if (!playerXMoves.includes(i) && !playerOMoves.includes(i)) {
      setCellInput(null);
      setTempCellInput(null);
    }
  }, [playerXMoves, playerOMoves]);

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
      onClick={() => handleCellClick(cellInput, i)}
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
