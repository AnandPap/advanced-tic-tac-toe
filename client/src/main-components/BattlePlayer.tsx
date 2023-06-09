import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Cell from "./Cell";
import BackButton from "../header/BackButton";
import ErrorMessage from "./ErrorMessage";
import { saveResult } from "../helpers/fetch-functions";
import Saving from "./Saving";
import { errorHandler } from "../helpers/error-functions";

const BattlePlayer = () => {
  const [players, setPlayers] = useState({ player1: "", player2: "" });
  const [playerXMoves, setPlayerXMoves] = useState<number[]>([]);
  const [playerOMoves, setPlayerOMoves] = useState<number[]>([]);
  const [currentSymbol, setCurrentSymbol] = useState<"X" | "O">("X");
  const [gameId, setGameId] = useState(1);
  const [score, setScore] = useState({ player1: 0, player2: 0, tie: 0 });
  const [errorMessage, setErrorMessage] = useState("");
  const [axiosError, setAxiosError] = useState("");
  const [winner, setWinner] = useState<"player1" | "player2" | "tie" | null>(
    null
  );
  const [errorTimeoutId, setErrorTimeoutId] = useState<number | undefined>(
    undefined
  );
  const [saveCompleted, setSaveCompleted] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({
    player1: "",
    player2: "",
  });
  const player1Name = searchParams.get("player1");
  const player2Name = searchParams.get("player2");

  const winningPatterns = [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  useEffect(() => {
    if (
      player1Name &&
      player2Name &&
      player1Name.length > 1 &&
      player2Name.length > 1
    ) {
      setPlayers({ player1: player1Name, player2: player2Name });
    } else {
      navigate("/vs-player", { replace: true });
    }
  }, []);

  useEffect(() => {
    const winner = checkWinner();
    if (winner) {
      const saveData = async () => {
        const res = await saveResult({
          player1: players.player1,
          player2: players.player2,
          winner: winner,
          date: Date.now(),
        });
        if (!res || !("winner" in res))
          setTimeout(() => setAxiosError(errorHandler(res)), 1000);
        else console.log(res);
        setTimeout(() => setSaveCompleted(true), 1000);
      };
      saveData();
      setWinner(winner);
      setScore((s) => ({ ...s, [winner]: s[winner] + 1 }));
      setGameId((s) => s + 1);
    } else {
      if ((playerXMoves.length + playerOMoves.length) % 2 === 0)
        setCurrentSymbol("X");
      else setCurrentSymbol("O");
    }
  }, [playerXMoves, playerOMoves]);

  function checkWinner() {
    for (let i = 0; i < winningPatterns.length; i++) {
      let winningPattern = winningPatterns[i];
      if (
        winningPattern.every((value) => playerXMoves.includes(value)) ||
        winningPattern.every((value) => playerOMoves.includes(value))
      )
        return checkCurrentTurn();
    }
    if (playerXMoves.length + playerOMoves.length === 9) return "tie";
    return null;
  }

  function checkCurrentTurn() {
    if (
      (gameId % 2 === 1 && currentSymbol === "X") ||
      (gameId % 2 === 0 && currentSymbol === "O")
    )
      return "player1";
    else return "player2";
  }

  function removeElementFromPlayer1() {
    let tempArray = [...playerXMoves];
    tempArray.pop();
    setPlayerXMoves(tempArray);
  }

  function removeElementFromPlayer2() {
    let tempArray = [...playerOMoves];
    tempArray.pop();
    setPlayerOMoves(tempArray);
  }

  function undoHandler() {
    setErrorMessage("");
    if (currentSymbol === "X") removeElementFromPlayer2();
    else removeElementFromPlayer1();
  }

  function handleGameReset() {
    setPlayerXMoves([]);
    setPlayerOMoves([]);
    setWinner(null);
    setSaveCompleted(false);
    setAxiosError("");
  }

  function handlePlayerReset() {
    navigate("/vs-player", { replace: true });
  }

  function handleCellClick(cellInput: string | null, i: number) {
    clearTimeout(errorTimeoutId);
    if (!cellInput && !winner) {
      if (currentSymbol === "X") setPlayerXMoves((s) => [...s, i]);
      else if (currentSymbol === "O") setPlayerOMoves((s) => [...s, i]);
      setErrorMessage("");
    } else if (!winner) {
      setErrorMessage("Choose unoccupied cell!");
      const timeoutId = setTimeout(() => setErrorMessage(""), 2000);
      setErrorTimeoutId(timeoutId);
    }
  }

  return (
    <div className="battle-screen">
      {!winner ? (
        <div className="battle-status-bar">
          <p className="players-turn">
            It's
            {` ${players[checkCurrentTurn()]}`}
            's turn.
          </p>
          {playerXMoves.length + playerOMoves.length > 0 && (
            <div className="undo-button-wrapper">
              <BackButton
                className="undo-button"
                text="Undo"
                onClick={undoHandler}
              />
            </div>
          )}
        </div>
      ) : (
        <p className="winner-text">
          {winner === "tie" ? "It's a tie!" : `${players[winner]} wins!`}
        </p>
      )}
      <div className="board-wrapper">
        <div className="board-container">
          {[...Array(9)].map((item, i) => (
            <Cell
              key={i}
              i={i + 1}
              winner={winner}
              currentSymbol={currentSymbol}
              playerXMoves={playerXMoves}
              playerOMoves={playerOMoves}
              handleCellClick={handleCellClick}
            />
          ))}
        </div>
      </div>
      {winner &&
        (axiosError ? (
          <ErrorMessage className="error-message" text={axiosError} />
        ) : (
          <Saving saveCompleted={saveCompleted} />
        ))}
      {winner && (
        <div className="endgame">
          <div className="endgame-buttons-wrapper">
            <button className="button" onClick={handleGameReset}>
              New Round
            </button>
            <button className="button" onClick={handlePlayerReset}>
              Reset Players
            </button>
            <button className="button" onClick={() => navigate("/scoreboard")}>
              Scoreboard
            </button>
          </div>
        </div>
      )}
      {errorMessage && (
        <ErrorMessage className="error-message" text={errorMessage} />
      )}
    </div>
  );
};

export default BattlePlayer;
