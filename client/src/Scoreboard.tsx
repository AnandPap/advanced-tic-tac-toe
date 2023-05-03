import { Suspense, useEffect, useState } from "react";
import { ScoreType, getResults } from "./helpers/fetch-functions";

const Scoreboard = () => {
  const [scores, setScores] = useState<ScoreType[]>([]);
  const [error, setError] = useState("");

  async function getScores() {
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
  }, []);

  return (
    <table>
      <caption>Scoreboard</caption>
      <Suspense fallback={<div>Loading...</div>}>
        <thead>
          <tr>
            <th>Player name</th>
            <th>Games played</th>
            <th>Wins</th>
            <th>Winrate</th>
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
      </Suspense>
    </table>
  );
};

export default Scoreboard;
