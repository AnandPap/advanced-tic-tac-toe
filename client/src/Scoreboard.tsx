import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { ResultType } from "./main-components/BattlePlayer";

interface DataType {
  data: ResultType[];
}

interface ScoreType {
  playerName: string;
  gamesPlayed: number;
  wins: number;
  winRate: string;
}

const Scoreboard = () => {
  const [scores, setScores] = useState<ScoreType[]>([]);

  async function fetchResults() {
    try {
      const res: DataType = await axios.get(
        "http://localhost:5000/api/results"
      );
      const playerNamesSet: Set<string> = new Set();
      const unsortedScores: ScoreType[] = [];
      for (let i = 0; i < res.data.length; i++) {
        playerNamesSet.add(res.data[i].player1);
        playerNamesSet.add(res.data[i].player2);
      }
      for (const playerName of playerNamesSet.values()) {
        const playerScoreObject = { gamesPlayed: 0, wins: 0 };
        for (let i = 0; i < res.data.length; i++) {
          if (
            res.data[i].player1 === playerName ||
            res.data[i].player2 === playerName
          ) {
            playerScoreObject.gamesPlayed += 1;
            if (res.data[i][res.data[i].result] === playerName)
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
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchResults();
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
