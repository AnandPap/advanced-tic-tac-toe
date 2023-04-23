import React, { useState } from "react";
import { NavigateOptions, URLSearchParamsInit } from "react-router-dom";
import { useAppSelector } from "./redux/hooks";

type SetURLSearchParams = (
  nextInit?:
    | URLSearchParamsInit
    | ((prev: URLSearchParams) => URLSearchParamsInit),
  navigateOpts?: NavigateOptions
) => void;

type PlayersFormType = {
  players: {
    player1: string;
    player2: string;
  };
  setPlayers: React.Dispatch<
    React.SetStateAction<{
      player1: string;
      player2: string;
    }>
  >;
  setSearchParams: SetURLSearchParams;
};

const PlayersForm = ({
  players,
  setPlayers,
  setSearchParams,
}: PlayersFormType) => {
  const [errorMessage, setErrorMessage] = useState("");
  const theme = useAppSelector((s) => s.tictactoe.theme);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (players.player1.length < 2 && players.player2.length < 2)
      setErrorMessage("Please enter both player names.");
    else if (players.player1.length < 2)
      setErrorMessage("Please enter player1 name.");
    else if (players.player2.length < 2)
      setErrorMessage("Please enter player2 name.");
    else {
      setSearchParams({
        player1: players.player1,
        player2: players.player2,
      });
    }
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
            setPlayers((s) => {
              return { ...s, player1: e.target.value };
            });
            setErrorMessage("");
          }}
        />
        <p>Enter player 2 name:</p>
        <input
          type="text"
          value={players.player2}
          onChange={(e) => {
            setPlayers((s) => {
              return { ...s, player2: e.target.value };
            });
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

export default PlayersForm;
