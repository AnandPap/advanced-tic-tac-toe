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
        <div className={`arrow-right ${className}`} />
        <div className="opponent-info-elements">
          <div>
            <p>vs {result.opponentName}</p>
          </div>
          <div>
            <p>Games played: {result.gamesPlayed}</p>
          </div>
          <div>
            <p>WR: {result.winRate}%</p>
          </div>
        </div>
      </div>
      <div className={`accordion-content ${className}-accordion`}>
        <div className="game-info-wrapper">
          {gamesInfo[i].map((item, i) => (
            <div key={i}>
              <div>
                {i + 1}. played at:{" "}
                {item.datePlayed.toLocaleDateString("es-sp")},&nbsp;
              </div>
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
