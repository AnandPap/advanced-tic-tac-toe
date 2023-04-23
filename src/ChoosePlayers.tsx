import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "./redux/hooks";
import { useDispatch } from "react-redux";
import { setPlayers } from "./redux/tictactoe";

const ChoosePlayers = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const theme = useAppSelector((s) => s.tictactoe.theme);
  const players = useAppSelector((s) => s.tictactoe.players);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setPlayers({ player1: "", player2: "" }));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (players.player1.length < 2 && players.player2.length < 2)
      setErrorMessage("Please enter both player names.");
    else if (players.player1.length < 2)
      setErrorMessage("Please enter player1 name.");
    else if (players.player2.length < 2)
      setErrorMessage("Please enter player2 name.");
    else navigate("battle");
  };

  return (
    <div className={`${theme} players-form-wrapper`}>
      <form
        className={`${theme} players-form`}
        onSubmit={(e) => handleSubmit(e)}
        action="submit"
      >
        <p>Enter player 1 name:</p>
        <input
          type="text"
          value={players.player1}
          onChange={(e) => {
            dispatch(setPlayers({ player1: e.target.value }));
            setErrorMessage("");
          }}
        />
        <p>Enter player 2 name:</p>
        <input
          type="text"
          value={players.player2}
          onChange={(e) => {
            dispatch(setPlayers({ player2: e.target.value }));
            setErrorMessage("");
          }}
        />
        <button
          //   disabled={players.player1.length < 2 || players.player2.length < 2}
          type="submit"
          className="button"
        >
          Start battle
        </button>
      </form>
      {errorMessage && (
        <p className={`error-message ${theme}`}>{errorMessage}</p>
      )}
    </div>
  );
};

export default ChoosePlayers;
