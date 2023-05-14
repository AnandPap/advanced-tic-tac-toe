import { useEffect, useState } from "react";
import { ScoreType, getResults } from "../helpers/fetch-functions";
import { useAppSelector } from "../redux/hooks";
import TableHeaderCell from "../TableHeaderCell";
import ErrorMessage from "../ErrorMessage";
import { useNavigate } from "react-router-dom";

const Scoreboard = () => {
  const [scores, setScores] = useState<ScoreType[]>([]);
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

  function sortScores(scores: ScoreType[], type: string, direction: string) {
    const array = structuredClone(scores);
    array.sort((a: ScoreType, b: ScoreType) => {
      if (
        (direction === "up" && type !== "playerName") ||
        (type === "playerName" && direction === "down")
      )
        return a[type] > b[type] ? 1 : b[type] > a[type] ? -1 : 0;
      else return b[type] > a[type] ? 1 : a[type] > b[type] ? -1 : 0;
    });
    setScores(array);
  }

  async function getScores() {
    setLoading(true);
    const res = await getResults();
    if (res) {
      const playerNamesSet: Set<string> = new Set();
      const unsortedScores: ScoreType[] = [];
      for (let i = 0; i < res.length; i++) {
        playerNamesSet.add(res[i].player1);
        playerNamesSet.add(res[i].player2);
      }
      for (const playerName of playerNamesSet.values()) {
        const playerScoreObject = { gamesPlayed: 0, wins: 0 };
        for (let i = 0; i < res.length; i++) {
          if (res[i].player1 === playerName || res[i].player2 === playerName) {
            playerScoreObject.gamesPlayed += 1;
            if (res[i][res[i].result] === playerName)
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
      setError("Something went wrong.");
    }
    setTimeout(() => setLoading(false), 500);
  }

  return (
    <div className={`scoreboard-wrapper ${theme}`}>
      {loading ? (
        <div>Loading...</div>
      ) : !error ? (
        <table>
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
                <td>{score.playerName}</td>
                <td>{score.gamesPlayed}</td>
                <td>{score.wins}</td>
                <td>{score.winRate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorMessage className="error-message" text={error} />
      )}
    </div>
  );
};

export default Scoreboard;
