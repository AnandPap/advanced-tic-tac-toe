import { useEffect, useState } from "react";
import { getResults } from "../helpers/fetch-functions";
import { useAppSelector } from "../redux/hooks";
import TableHeaderCell from "./TableHeaderCell";
import ErrorMessage from "./ErrorMessage";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "../helpers/error-functions";
import Loading from "./Loading";

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
  const theme = useAppSelector((s) => s.tictactoe.theme);
  const navigate = useNavigate();
  const tableHeaderTitles = ["Player name", "Games played", "Wins", "Win rate"];

  useEffect(() => {
    getScores();
  }, []);

  useEffect(() => {
    const words = sortType.type.split(" ");
    let type = "";
    for (let i = 0; i < words.length; i++) {
      if (i === 0) {
        type += words[0].charAt(0).toLowerCase() + words[0].slice(1);
      } else {
        type += words[1].charAt(0).toUpperCase() + words[1].slice(1);
      }
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

  async function getScores() {
    setLoading(true);
    const res = await getResults();
    if (res && !("code" in res)) {
      const playerNamesSet: Set<string> = new Set();
      const unsortedScores: Score[] = [];
      for (let i = 0; i < res.length; i++) {
        playerNamesSet.add(res[i].player1);
        playerNamesSet.add(res[i].player2);
      }
      for (const playerName of playerNamesSet.values()) {
        const playerScoreObject = { gamesPlayed: 0, wins: 0 };
        for (let i = 0; i < res.length; i++) {
          if (res[i].player1 === playerName || res[i].player2 === playerName) {
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
    } else {
      setError(errorHandler(res));
    }
    setTimeout(() => setLoading(false), 250);
  }

  return loading ? (
    <Loading theme={theme} />
  ) : error ? (
    <ErrorMessage className="not-found" text={error} />
  ) : scores.length < 1 ? (
    <div>No scores to show.</div>
  ) : (
    <table className="scoreboard-table">
      <caption>Scoreboard</caption>
      <thead>
        <tr>
          {tableHeaderTitles.map((title, i) => (
            <TableHeaderCell
              key={i}
              title={title}
              className={`arrow-${sortType.direction} ${
                sortType.type === title ? "show" : ""
              }`}
              onClick={() =>
                setSortType((s) => {
                  let direction = "";
                  if (s.type === title && s.direction === "down")
                    direction = "up";
                  else direction = "down";
                  return {
                    direction: direction,
                    type: title,
                  };
                })
              }
            />
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
            {Object.keys(score).map((key, i) => {
              return (
                <td key={i}>
                  {score[key]}
                  {key === "winRate" && "%"}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Scoreboard;
