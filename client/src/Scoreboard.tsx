import { useEffect, useState } from "react";
import { ScoreType, getResults } from "./helpers/fetch-functions";
import { useAppSelector } from "./redux/hooks";
import TableHeaderCell from "./TableHeaderCell";

const Scoreboard = () => {
  const [scores, setScores] = useState<ScoreType[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState({
    direction: "down",
    type: "Player name",
  });
  const theme = useAppSelector((s) => s.tictactoe.theme);
  const tableHeaderTitles = ["Player name", "Games played", "Wins", "Winrate"];

  async function getScores() {
    setLoading(true);
    const res = await getResults();
    const playerNamesSet: Set<string> = new Set();
    const unsortedScores: ScoreType[] = [];
    if (res) {
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
          winRate: `${Math.round(
            (playerScoreObject.wins / playerScoreObject.gamesPlayed) * 100
          )}%`,
        });
      }
      setScores(unsortedScores);
      console.log(unsortedScores);
    } else {
      setError("Something went wrong.");
    }
  }

  useEffect(() => {
    getScores();
    setTimeout(() => setLoading(false), 500);
  }, []);

  useEffect(() => {}, [sortType.direction, sortType.type]);

  return (
    <div className={`scoreboard-wrapper ${theme}`}>
      {loading ? (
        <div>Loading...</div>
      ) : (
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
              <tr key={i}>
                <td>{score.playerName}</td>
                <td>{score.gamesPlayed}</td>
                <td>{score.wins}</td>
                <td>{score.winRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Scoreboard;
