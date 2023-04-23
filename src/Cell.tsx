import { useEffect, useState } from "react";

type CellType = {
  i: number;
  gameResult: string | null;
  currentSymbol: string;
  setPlayer1Moves: React.Dispatch<React.SetStateAction<number[]>>;
  setPlayer2Moves: React.Dispatch<React.SetStateAction<number[]>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

const Cell = ({
  i,
  gameResult,
  currentSymbol,
  setPlayer1Moves,
  setPlayer2Moves,
  setErrorMessage,
}: CellType) => {
  const [cellInput, setCellInput] = useState<string | null>(null);
  const border =
    i === 2 || i === 8
      ? "border-right-left"
      : i === 4 || i === 6
      ? "border-top-bottom"
      : i === 5
      ? "border-all-around"
      : "";

  useEffect(() => {
    if (!gameResult) setCellInput(null);
  }, [gameResult]);

  function handleClick() {
    if (!cellInput && !gameResult) {
      if (currentSymbol === "X") {
        setPlayer1Moves((s) => [...s, i]);
        setCellInput("X");
      } else if (currentSymbol === "O") {
        setPlayer2Moves((s) => [...s, i]);
        setCellInput("O");
      }
      setErrorMessage("");
    } else if (!gameResult) setErrorMessage("Choose unoccupied cell!");
  }

  return (
    <div className={`board-cell-wrapper ${border}`} onClick={handleClick}>
      <button
        className={`${
          !gameResult && !cellInput && "hoverable-board-cell"
        } board-cell`}
      >
        {cellInput}
      </button>
    </div>
  );
};

export default Cell;
