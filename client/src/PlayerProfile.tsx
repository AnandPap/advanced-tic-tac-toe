import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlayerResults, ResultType } from "./helpers/fetch-functions";
import { axiosErrorHandler } from "./helpers/error-functions";

const PlayerProfile = () => {
  const [playerInfo, setPlayerInfo] = useState<ResultType[]>([]);
  const [error, setError] = useState("");
  const { playerName } = useParams();

  useEffect(() => {
    getPlayerGames(playerName);
  }, []);

  async function getPlayerGames(playerName: string | undefined) {
    if (playerName) {
      const res = await getPlayerResults(playerName);
      if (res && !("code" in res)) setPlayerInfo(res);
      else setError(axiosErrorHandler(res));
    }
  }

  return (
    <div className="player-profile-wrapper">
      {!error ? (
        <>
          <h2>{playerName}'s profile</h2>
          {playerInfo.map((result, i) => (
            <div key={i}>
              <span>
                vs{" "}
                {result.player1 === playerName
                  ? result.player2
                  : result.player1}
              </span>
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
