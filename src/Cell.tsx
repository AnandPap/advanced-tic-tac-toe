import { useEffect, useState } from "react";
import { useAppSelector } from "./redux/hooks";

type CellType = {
  i: number;
  gameResult: string | null;
  currentSymbol: string;
  setPlayer1Moves: React.Dispatch<React.SetStateAction<number[]>>;
  setPlayer2Moves: React.Dispatch<React.SetStateAction<number[]>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  errorTimeoutId: number | undefined;
  setErrorTimeoutId: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const Cell = ({
  i,
  gameResult,
  currentSymbol,
  setPlayer1Moves,
  setPlayer2Moves,
  setErrorMessage,
  errorTimeoutId,
  setErrorTimeoutId,
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

  function handleClick() {
    clearTimeout(errorTimeoutId);
    if (!cellInput && !gameResult) {
      if (currentSymbol === "X") {
        setPlayer1Moves((s) => [...s, i]);
        setCellInput("X");
      } else if (currentSymbol === "O") {
        setPlayer2Moves((s) => [...s, i]);
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
