import { useEffect, useState } from "react";
import { useAppSelector } from "./redux/hooks";

type CellType = {
  i: number;
  gameResult: string | null;
  currentSymbol: string;
  playerXMoves: number[];
  playerOMoves: number[];
  setPlayerXMoves: React.Dispatch<React.SetStateAction<number[]>>;
  setPlayerOMoves: React.Dispatch<React.SetStateAction<number[]>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  errorTimeoutId: number | undefined;
  setErrorTimeoutId: React.Dispatch<React.SetStateAction<number | undefined>>;
  removedCell: number | undefined;
  setRemovedCell: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const Cell = ({
  i,
  gameResult,
  currentSymbol,
  playerXMoves,
  playerOMoves,
  setPlayerXMoves,
  setPlayerOMoves,
  setErrorMessage,
  errorTimeoutId,
  setErrorTimeoutId,
  removedCell,
  setRemovedCell,
}: CellType) => {
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
  const theme = useAppSelector((s) => s.tictactoe.theme);

  useEffect(() => {
    if (!gameResult) {
      setCellInput(null);
      setTempCellInput(null);
    }
  }, [gameResult]);

  useEffect(() => {
    if (removedCell === i) setCellInput("");
  }, [removedCell]);

  useEffect(() => {
    if ((playerXMoves.includes(i) || playerOMoves.includes(i)) && !cellInput)
      setCellInput(currentSymbol);
  }, [playerXMoves, playerOMoves]);

  function handleClick() {
    clearTimeout(errorTimeoutId);
    setRemovedCell(undefined);
    if (!cellInput && !gameResult) {
      if (currentSymbol === "X") {
        setPlayerXMoves((s) => [...s, i]);
        setCellInput("X");
      } else if (currentSymbol === "O") {
        setPlayerOMoves((s) => [...s, i]);
        setCellInput("O");
      }
      setErrorMessage("");
    } else if (!gameResult) {
      setErrorMessage("Choose unoccupied cell!");
      const timeoutId = setTimeout(() => setErrorMessage(""), 2000);
      setErrorTimeoutId(timeoutId);
    }
  }

  return (
    <div
      className={`board-cell-wrapper ${border} ${theme}`}
      onClick={handleClick}
    >
      <button
        onMouseEnter={() => {
          if (!cellInput && !gameResult) {
            const timeoutId = setTimeout(() => {
              setTempCellInput(currentSymbol);
            }, 50);
            setCellTimeoutId(timeoutId);
          }
        }}
        onMouseLeave={() => {
          setTempCellInput(null);
          clearTimeout(cellTimeoutId);
        }}
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
