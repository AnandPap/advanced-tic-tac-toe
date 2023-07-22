import { useEffect, useState } from "react";

interface PlayerStatusBarProps {
  currentSymbol: "X" | "O";
  player: "player1" | "player2";
  playerName: string | null;
  firstTurn: "player1" | "player2" | null;
  checkCurrentTurn: () => "player1" | "player2" | null;
}

const PlayerStatusBar = ({
  currentSymbol,
  player,
  playerName,
  firstTurn,
  checkCurrentTurn,
}: PlayerStatusBarProps) => {
  const [symbol, setSymbol] = useState("");
  const [currentTurn, setCurrentTurn] = useState<"player1" | "player2" | null>(
    null
  );

  function symbolHandler() {
    if (firstTurn === player) return "X";
    else return "O";
  }

  useEffect(() => {
    setSymbol(symbolHandler());
    setCurrentTurn(checkCurrentTurn());
  }, [firstTurn, currentSymbol]);

  return (
    <div
      className={`player-status-bar ${currentTurn === player ? "active" : ""}`}
    >
      <div className="player-dot" />
      <p>
        <span className="players-turn-name">{playerName}</span> as ({symbol})
      </p>
    </div>
  );
};

export default PlayerStatusBar;
