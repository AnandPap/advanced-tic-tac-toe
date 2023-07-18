import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPlayerResults } from "../helpers/fetch-functions";
import { errorHandler } from "../helpers/error-functions";
import PlayerGames from "./PlayerGames";
import ErrorMessage from "../reusable/ErrorMessage";
import Loading from "../reusable/Loading";

export type OpponentInfo = {
  opponentName: string;
  gamesPlayed: number;
  wins: number;
  winRate: number;
};

export type GameInfo = {
  datePlayed: Date;
  winner: string;
};

const PlayerProfile = () => {
  const [opponentsInfo, setOpponentsInfo] = useState<OpponentInfo[]>([]);
  const [gamesInfo, setGamesInfo] = useState<GameInfo[][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { playerName } = useParams();

  useEffect(() => {
    getPlayerResults(playerName);
    setTimeout(() => setLoading(false), 500);
  }, []);

  async function getPlayerResults(playerName: string | undefined) {
    if (playerName) {
      const res = await fetchPlayerResults(playerName);
      if (res && !("code" in res)) {
        const playerNameSet: Set<string> = new Set();
        const overallInfoTemp: OpponentInfo[] = [];
        const gamesInfoTemp: GameInfo[][] = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].player1 !== playerName) playerNameSet.add(res[i].player1);
          else playerNameSet.add(res[i].player2);
        }
        const iterator = playerNameSet.entries();
        for (const entry of iterator) {
          overallInfoTemp.push({
            opponentName: entry[0],
            gamesPlayed: 0,
            wins: 0,
            winRate: 0,
          });
          gamesInfoTemp.push([]);
          for (let i = 0; i < res.length; i++) {
            if (res[i].player1 === entry[0] || res[i].player2 === entry[0]) {
              const winner =
                res[i][res[i].winner] === res[i].player1
                  ? res[i].player1
                  : res[i].player2;
              // const dateFormat = Intl.DateTimeFormat()
              gamesInfoTemp[gamesInfoTemp.length - 1].push({
                datePlayed: new Date(res[i].date),
                winner: winner,
              });
            }
          }
        }
        for (let i = 0; i < overallInfoTemp.length; i++) {
          const oppInfo = overallInfoTemp[i];
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
        setGamesInfo(gamesInfoTemp);
        setOpponentsInfo(overallInfoTemp);
      } else setError(errorHandler(res));
    }
  }

  return loading ? (
    <Loading />
  ) : error ? (
    <ErrorMessage className="not-found" text={error} />
  ) : (
    <>
      <h4 className="player-profile-heading">{playerName}'s games</h4>
      <div className="opponents-info-wrapper">
        {opponentsInfo.map((opponentInfo, i) => (
          <PlayerGames
            key={i}
            opponentInfo={opponentInfo}
            gamesInfo={gamesInfo}
            i={i}
          />
        ))}
      </div>
    </>
  );
};

export default PlayerProfile;
