import { useState } from "react";
import { GameInfo, OpponentInfo } from "./PlayerProfile";

type OpponentInfoProps = {
  opponentInfo: OpponentInfo;
  gamesInfo: GameInfo[][];
  i: number;
};

const PlayerGames = ({ opponentInfo, gamesInfo, i }: OpponentInfoProps) => {
  const [className, setClassName] = useState("closed");

  function handleClassName() {
    setClassName((s) => (s === "opened" ? "closed" : "opened"));
  }

  return (
    <>
      <div className="opponent-info-bar" onClick={handleClassName}>
        <div className={`arrow-right ${className}`} />
        <div className="opponent-info-elements">
          <div>
            <p>vs {opponentInfo.opponentName}</p>
          </div>
          <div>
            <p>Games played: {opponentInfo.gamesPlayed}</p>
          </div>
          <div>
            <p>Wins: {opponentInfo.wins}</p>
          </div>
          <div>
            <p>WR: {opponentInfo.winRate}%</p>
          </div>
        </div>
      </div>
      <div className={`accordion-content ${className}-accordion`}>
        <div className="games-info-wrapper">
          {gamesInfo[i].map((gameInfo, i) => (
            <div className="game-info" key={i}>
              <div>
                {i + 1}. played at:{" "}
                {gameInfo.datePlayed.toLocaleDateString("es-sp")},&nbsp;
              </div>
              <div>
                <span>winner:&nbsp;</span>
                <span
                  className={`game-info-winner ${
                    gameInfo.winner === opponentInfo.opponentName
                      ? "red"
                      : "green"
                  }`}
                >
                  {gameInfo.winner}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PlayerGames;
