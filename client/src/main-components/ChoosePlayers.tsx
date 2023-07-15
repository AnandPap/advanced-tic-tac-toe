import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";

const ChoosePlayers = () => {
  const [players, setPlayers] = useState({ player1: "", player2: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (players.player1.length < 2 && players.player2.length < 2)
      setErrorMessage("Please enter players' names.");
    else if (players.player1.length < 2)
      setErrorMessage("Please enter player1 name.");
    else if (players.player2.length < 2)
      setErrorMessage("Please enter player2 name.");
    else if (players.player1 === players.player2)
      setErrorMessage("Players must have different names");
    else
      navigate(`battle?player1=${players.player1}&player2=${players.player2}`);
  };

  return (
    <form className="players-form" onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="player1">Enter player 1 name:</label>
      <input
        id="player1"
        type="text"
        value={players.player1}
        autoFocus
        onChange={(e) => {
          setPlayers((s) => ({ ...s, player1: e.target.value }));
          setErrorMessage("");
        }}
      />
      <label htmlFor="player2">Enter player 2 name:</label>
      <input
        id="player2"
        type="text"
        value={players.player2}
        onChange={(e) => {
          setPlayers((s) => ({ ...s, player2: e.target.value }));
          setErrorMessage("");
        }}
      />
      <button type="submit" className="button">
        Start battle
      </button>
      {errorMessage && (
        <ErrorMessage className="error-message" text={errorMessage} />
      )}
    </form>
  );
};

export default ChoosePlayers;
