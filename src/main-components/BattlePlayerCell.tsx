import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";

type CellType = {
  i: number;
  gameResult: string | null;
  currentSymbol: string;
  playerXMoves: number[];
  playerOMoves: number[];
  handleCellClick: (cellInput: string | null, i: number) => void;
};

const Cell = ({
  i,
  gameResult,
  currentSymbol,
  playerXMoves,
  playerOMoves,
  handleCellClick,
}: CellType) => {
  const [cellInput, setCellInput] = useState<string | null>(null);
  const [tempCellInput, setTempCellInput] = useState<string | null>(null);
  const [cellTimeoutId, setCellTimeoutId] = useState<number | undefined>(
    undefined
  );
  const theme = useAppSelector((s) => s.tictactoe.theme);
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
    else if (!playerXMoves.includes(i) && !playerOMoves.includes(i))
      setCellInput(null);
  }, [playerXMoves, playerOMoves]);

  function handleSettingTempCellInput() {
    if (!cellInput && !gameResult) {
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
      className={`board-cell-wrapper ${border} ${theme}`}
      onClick={() => handleCellClick(cellInput, i)}
    >
      <button
        onMouseEnter={handleSettingTempCellInput}
        onMouseLeave={handleRemovingTempCellInput}
        className={`board-cell ${theme} ${
          !gameResult && !cellInput && "hoverable-board-cell"
        }`}
      >
        {tempCellInput || cellInput}
      </button>
    </div>
  );
};

export default Cell;
