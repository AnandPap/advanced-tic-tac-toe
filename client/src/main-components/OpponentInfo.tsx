import { useState } from "react";
import { GamesInfo, OverallInfo } from "./PlayerProfile";

type OpponentInfoProps = {
  gamesInfo: GamesInfo[][];
  result: OverallInfo;
  i: number;
};

const OpponentInfo = ({ gamesInfo, result, i }: OpponentInfoProps) => {
  const [className, setClassName] = useState("");
  return (
    <>
      <div
        className="opponent-info"
        onClick={() => {
          className === "closed" || className === ""
            ? setClassName("opened")
            : setClassName("closed");
        }}
      >
        <div>
          <div className={`arrow-right ${className}`}></div>
          vs {result.opponentName}
        </div>
        <div>Games played: {result.gamesPlayed}</div>
        <div>WR: {result.winRate}%</div>
      </div>
      <div className={`accordion-content ${className}-accordion`}>
        <div className="game-info-wrapper">
          {gamesInfo[i].map((item, i) => (
            <div key={i}>
              <span>
                {i + 1}. played at:{" "}
                {item.datePlayed.toLocaleDateString("es-sp")},&nbsp;
              </span>
              <div>
                <span>winner:&nbsp;</span>
                <span
                  className={
                    item.winner === result.opponentName ? "red" : "green"
                  }
                >
                  {item.winner}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OpponentInfo;
