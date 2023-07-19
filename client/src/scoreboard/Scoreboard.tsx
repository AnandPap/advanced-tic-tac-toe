import { useEffect, useState } from "react";
import Loading from "../reusable/Loading";
import ErrorMessage from "../reusable/ErrorMessage";
import { fetchResults } from "../helpers/fetch-functions";
import { errorHandler } from "../helpers/error-functions";
import { useNavigate } from "react-router-dom";

export interface Score {
  [key: string]: string | number;
  playerName: string;
  gamesPlayed: number;
  wins: number;
  winRate: number;
}

const Scoreboard = () => {
  const [scores, setScores] = useState<Score[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState({
    type: "Player name",
    direction: "down",
  });
  const navigate = useNavigate();
  const tableHeaderTitles = ["Player name", "Games played", "Wins", "Win rate"];

  useEffect(() => {
    getResults();
  }, []);

  useEffect(() => {
    const words = sortType.type.split(" ");
    let type = "";
    for (let i = 0; i < words.length; i++) {
      if (i === 0) type += words[0].charAt(0).toLowerCase() + words[0].slice(1);
      else type += words[1].charAt(0).toUpperCase() + words[1].slice(1);
    }
    sortScores(scores, type, sortType.direction);
  }, [sortType.type, sortType.direction]);

  function sortScores(scores: Score[], type: string, direction: string) {
    const clonedScores: Score[] = structuredClone(scores);
    clonedScores.sort((a, b) => {
      if (
        (direction === "up" && type !== "playerName") ||
        (type === "playerName" && direction === "down")
      )
        return a[type] > b[type] ? 1 : b[type] > a[type] ? -1 : 0;
      else return b[type] > a[type] ? 1 : a[type] > b[type] ? -1 : 0;
    });
    setScores(clonedScores);
  }

  async function getResults() {
    const res = await fetchResults();
    if (res && !("code" in res)) {
      if (res.length === 0) setError("No scores to show.");
      else {
        const playerNamesSet: Set<string> = new Set();
        const unsortedScores: Score[] = [];
        for (let i = 0; i < res.length; i++) {
          playerNamesSet.add(res[i].player1);
          playerNamesSet.add(res[i].player2);
        }
        for (const playerName of playerNamesSet.values()) {
          const playerScoreObject = { gamesPlayed: 0, wins: 0 };
          for (let i = 0; i < res.length; i++) {
            if (
              res[i].player1 === playerName ||
              res[i].player2 === playerName
            ) {
              playerScoreObject.gamesPlayed += 1;
              if (res[i][res[i].winner] === playerName)
                playerScoreObject.wins += 1;
            }
          }
          unsortedScores.push({
            playerName: playerName,
            ...playerScoreObject,
            winRate: Math.round(
              (playerScoreObject.wins / playerScoreObject.gamesPlayed) * 100
            ),
          });
        }
        sortScores(unsortedScores, "playerName", "down");
      }
    } else {
      setError(errorHandler(res));
    }
    setTimeout(() => setLoading(false), 500);
  }

  function sortHandler(title: string) {
    let direction = "";
    if (sortType.type === title && sortType.direction === "down")
      direction = "up";
    else direction = "down";
    setSortType({
      direction: direction,
      type: title,
    });
  }

  return loading ? (
    <Loading />
  ) : error ? (
    <ErrorMessage className="not-found" text={error} />
  ) : (
    <table className="scoreboard-table">
      <caption>Scoreboard</caption>
      <thead>
        <tr>
          {tableHeaderTitles.map((title, i) => (
            <th key={i} onClick={() => sortHandler(title)}>
              <div>
                <h4 className="header-cell-title">{title}</h4>
                <div
                  className={`arrow-${sortType.direction} ${
                    sortType.type === title ? "show" : ""
                  }`}
                ></div>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {scores.map((score, i) => (
          <tr
            key={i}
            onClick={() =>
              navigate(`/scoreboard/player-profile/${score.playerName}`)
            }
          >
            {Object.keys(score).map((key, i) => (
              <td key={i}>
                {score[key]}
                {key === "winRate" && "%"}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Scoreboard;
