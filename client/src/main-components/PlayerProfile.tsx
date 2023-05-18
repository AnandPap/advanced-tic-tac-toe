import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlayerResults } from "../helpers/fetch-functions";
import { errorHandler } from "../helpers/error-functions";
import { useAppSelector } from "../redux/hooks";

type OpponentInfo = {
  opponentName: string;
  gamesPlayed: number;
  wins: number;
  winRate: number;
};

const PlayerProfile = () => {
  const [opponentInfo, setOpponentInfo] = useState<OpponentInfo[]>([]);
  const [error, setError] = useState("");
  const theme = useAppSelector((s) => s.tictactoe.theme);
  const { playerName } = useParams();

  useEffect(() => {
    getPlayerGames(playerName);
  }, []);

  async function getPlayerGames(playerName: string | undefined) {
    if (playerName) {
      const res = await getPlayerResults(playerName);
      if (res && !("code" in res)) {
        const playerNameSet: Set<string> = new Set();
        const opponentInfoArray: OpponentInfo[] = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].player1 !== playerName) playerNameSet.add(res[i].player1);
          else playerNameSet.add(res[i].player2);
        }
        const iterator = playerNameSet.entries();
        for (const entry of iterator) {
          opponentInfoArray.push({
            opponentName: entry[0],
            gamesPlayed: 0,
            wins: 0,
            winRate: 0,
          });
        }
        for (let i = 0; i < opponentInfoArray.length; i++) {
          const oppInfo = opponentInfoArray[i];
          for (let j = 0; j < res.length; j++) {
            const result = res[j];
            if (
              oppInfo.opponentName === result.player1 ||
              oppInfo.opponentName === result.player2
            ) {
              if (playerName === result[result.winner]) oppInfo.wins++;
              oppInfo.gamesPlayed++;
            }
          }
          oppInfo.winRate = Math.round(
            (oppInfo.wins / oppInfo.gamesPlayed) * 100
          );
        }
        setOpponentInfo(opponentInfoArray);
      } else setError(errorHandler(res));
    }
  }

  return (
    <div className={`player-profile-wrapper ${theme}`}>
      {!error ? (
        <>
          <h2>{playerName}'s profile</h2>
          {opponentInfo.map((result, i) => (
            <div key={i} style={{ display: "flex", gap: "1rem" }}>
              <div>{result.opponentName}</div>
              <div>{result.gamesPlayed}</div>
              <div>{result.winRate}%</div>
            </div>
          ))}
        </>
      ) : (
        <div>{error}</div>
      )}
    </div>
  );
};

export default PlayerProfile;
