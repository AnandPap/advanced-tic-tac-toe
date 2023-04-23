import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PlayersForm from "./PlayersForm";
import BattlePlayer from "./BattlePlayer";

const ChoosePlayers = () => {
  const [players, setPlayers] = useState({ player1: "", player2: "" });

  const [searchParams, setSearchParams] = useSearchParams({
    player1: "",
    player2: "",
  });
  const player1Name = searchParams.get("player1");
  const player2Name = searchParams.get("player2");
  const navigate = useNavigate();

  useEffect(() => {
    if (player1Name && player2Name) {
      if (player1Name.length > 1 && player2Name.length > 1) {
        setPlayers({
          player1: player1Name,
          player2: player2Name,
        });
      } else {
        setPlayers({
          player1: "",
          player2: "",
        });
        navigate("/vs-player", { replace: true });
      }
    }
    if (!player1Name || !player2Name) {
      navigate("/vs-player", { replace: true });
    }
  }, [player1Name, player2Name]);

  return (
    <div>
      {player1Name === null ||
      player1Name === "" ||
      player2Name === null ||
      player2Name === "" ? (
        <PlayersForm
          players={players}
          setPlayers={setPlayers}
          setSearchParams={setSearchParams}
        />
      ) : (
        <BattlePlayer players={players} setPlayers={setPlayers} />
      )}
    </div>
  );
};

export default ChoosePlayers;
