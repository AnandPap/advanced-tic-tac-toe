import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { useDispatch } from "react-redux";
import { setPlayers } from "../redux/tictactoe";
import ErrorMessage from "./ErrorMessage";

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
      setErrorMessage("Please enter players' names.");
    else if (players.player1.length < 2)
      setErrorMessage("Please enter player1 name.");
    else if (players.player2.length < 2)
      setErrorMessage("Please enter player2 name.");
    else navigate("battle");
  };

  return (
    <>
      <form
        className={`${theme} players-form`}
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor="player1">Enter player 1 name:</label>
        <input
          id="player1"
          type="text"
          value={players.player1}
          autoFocus
          onChange={(e) => {
            dispatch(setPlayers({ player1: e.target.value }));
            setErrorMessage("");
          }}
        />
        <label htmlFor="player2">Enter player 2 name:</label>
        <input
          id="player2"
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
        <ErrorMessage className="error-message" text={errorMessage} />
      )}
    </>
  );
};

export default ChoosePlayers;
