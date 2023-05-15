import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlayerResults } from "../helpers/fetch-functions";
import { errorHandler } from "../helpers/error-functions";

type PlayerInfo = {
  opponentName: string;
  gamesPlayed: number;
  winRate: number;
};

const PlayerProfile = () => {
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo[]>([]);
  const [error, setError] = useState("");
  const { playerName } = useParams();

  useEffect(() => {
    getPlayerGames(playerName);
  }, []);

  async function getPlayerGames(playerName: string | undefined) {
    if (playerName) {
      const res = await getPlayerResults(playerName);
      if (res && !("code" in res)) {
        const set: Set<string> = new Set();
        const arrayOfObjects: PlayerInfo[] = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].player1 !== playerName) set.add(res[i].player1);
          else set.add(res[i].player2);
        }
        const iterator = set.entries();
        for (const entry of iterator) {
          arrayOfObjects.push({
            opponentName: entry[0],
            gamesPlayed: 0,
            winRate: 0,
          });
        }
        setPlayerInfo(arrayOfObjects);
      } else setError(errorHandler(res));
    }
  }

  return (
    <div className="player-profile-wrapper">
      {!error ? (
        <>
          <h2>{playerName}'s profile</h2>
          {playerInfo.map((result, i) => (
            <div key={i} style={{ display: "flex" }}>
              <span>{result.opponentName}</span>
              <span>{result.gamesPlayed}</span>
              <span>{result.winRate}</span>
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
