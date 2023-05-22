import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlayerResults } from "../helpers/fetch-functions";
import { errorHandler } from "../helpers/error-functions";
import { useAppSelector } from "../redux/hooks";
import OpponentInfo from "./OpponentInfo";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";

export type OverallInfo = {
  opponentName: string;
  gamesPlayed: number;
  wins: number;
  winRate: number;
};

export type GamesInfo = {
  datePlayed: Date;
  winner: string;
};

const PlayerProfile = () => {
  const [overallInfo, setOverallInfo] = useState<OverallInfo[]>([]);
  const [gamesInfo, setGamesInfo] = useState<GamesInfo[][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const theme = useAppSelector((s) => s.tictactoe.theme);
  const { playerName } = useParams();

  useEffect(() => {
    getPlayerGames(playerName);
    setTimeout(() => setLoading(false), 500);
  }, []);

  async function getPlayerGames(playerName: string | undefined) {
    if (playerName) {
      const res = await getPlayerResults(playerName);
      if (res && !("code" in res)) {
        const playerNameSet: Set<string> = new Set();
        const overallInfoTemp: OverallInfo[] = [];
        const gamesInfoTemp: GamesInfo[][] = [];
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
        setOverallInfo(overallInfoTemp);
      } else setError(errorHandler(res));
    }
  }

  return loading ? (
    <Loading />
  ) : error ? (
    <ErrorMessage className="not-found" text={error} />
  ) : (
    <>
      <h4 className="player-profile-heading">{playerName}'s profile</h4>
      <div className="opponent-info-wrapper">
        {overallInfo.map((result, i) => (
          <OpponentInfo gamesInfo={gamesInfo} result={result} key={i} i={i} />
        ))}
      </div>
    </>
  );
};

export default PlayerProfile;
