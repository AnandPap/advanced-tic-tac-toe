import React, { useState } from "react";
import { NavigateOptions, URLSearchParamsInit } from "react-router-dom";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(players.player2.length);
    if (players.player1.length < 2 && players.player2.length < 2)
      setErrorMessage("Please enter player names.");
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
    <div>
      <form onSubmit={(e) => handleSubmit(e)} action="submit">
        <p>Player 1 name:</p>
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
        <p>Player 2 name:</p>
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
          className="submit-button form-element button"
        >
          Submit
        </button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default PlayersForm;
