interface PlayerStatusBarProps {
  currentTurn: string;
  playerNumber: "player1" | "player2";
  playerName: string | null;
  gameId: number;
}

const PlayerStatusBar = ({
  currentTurn,
  playerNumber,
  playerName,
  gameId,
}: PlayerStatusBarProps) => {
  function symbolHandler() {
    if (
      (playerNumber === "player1" && gameId % 2 === 1) ||
      (playerNumber === "player2" && gameId % 2 === 0)
    )
      return "X";
    else return "O";
  }

  return (
    <div
      className={`player-status-bar ${
        currentTurn === playerName ? "active" : ""
      }`}
    >
      <div
        className={`player-dot ${currentTurn === playerName ? "active" : ""}`}
      />
      <p>
        <span className="players-turn-name">{playerName}</span> as (
        {symbolHandler()})
      </p>
    </div>
  );
};

export default PlayerStatusBar;
