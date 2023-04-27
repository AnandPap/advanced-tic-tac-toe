import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { useDispatch } from "react-redux";
import { setPlayers } from "../redux/tictactoe";
import BattlePlayerCell from "./BattlePlayerCell";
import BackButton from "../header/BackButton";
import ErrorMessage from "../ErrorMessage";

const BattlePlayer = () => {
  const [currentSymbol, setCurrentSymbol] = useState<"X" | "O">("X");
  const [gameId, setGameId] = useState(1);
  const [score, setScore] = useState({ player1: 0, player2: 0, tie: 0 });
  const [errorMessage, setErrorMessage] = useState("");
  const [gameResult, setGameResult] = useState<
    "player1" | "player2" | "tie" | null
  >(null);
  const [playerXMoves, setPlayerXMoves] = useState<number[]>([]);
  const [playerOMoves, setPlayerOMoves] = useState<number[]>([]);
  const [errorTimeoutId, setErrorTimeoutId] = useState<number | undefined>(
    undefined
  );
  const theme = useAppSelector((s) => s.tictactoe.theme);
  const players = useAppSelector((s) => s.tictactoe.players);
  const dispatch = useDispatch();
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
      dispatch(setPlayers({ player1: player1Name, player2: player2Name }));
    } else if (players.player1.length > 1 && players.player2.length > 1) {
      setSearchParams(
        { player1: players.player1, player2: players.player2 },
        { replace: true }
      );
    } else {
      navigate("/vs-player", { replace: true });
    }
  }, []);

  useEffect(() => {
    const result = checkWinner();
    if (result) {
      setGameResult(result);
      setScore((s) => ({ ...s, [result]: s[result] + 1 }));
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
    setGameResult(null);
  }

  function handlePlayerReset() {
    navigate("/vs-player", { replace: true });
  }

  function handleCellClick(cellInput: string | null, i: number) {
    clearTimeout(errorTimeoutId);
    if (!cellInput && !gameResult) {
      if (currentSymbol === "X") setPlayerXMoves((s) => [...s, i]);
      else if (currentSymbol === "O") setPlayerOMoves((s) => [...s, i]);
      setErrorMessage("");
    } else if (!gameResult) {
      setErrorMessage("Choose unoccupied cell!");
      const timeoutId = setTimeout(() => setErrorMessage(""), 2000);
      setErrorTimeoutId(timeoutId);
    }
  }

  return (
    <div className={`${theme} battle-screen-wrapper`}>
      <div className="battle-screen">
        {!gameResult ? (
          <div className="battle-status-bar">
            <p className="players-turn">
              It's
              {` ${players[checkCurrentTurn()]}`}
              's turn.
            </p>
            {playerXMoves.length + playerOMoves.length > 0 && (
              <div className="undo-button-wrapper">
                <BackButton
                  className={`${theme} undo-button`}
                  text="Undo"
                  onClick={undoHandler}
                />
              </div>
            )}
          </div>
        ) : (
          <p className="winner-text">
            {gameResult === "tie"
              ? "It's a tie!"
              : `${players[gameResult]} wins!`}
          </p>
        )}
        <div className="board-wrapper">
          <div className="board-container">
            {[...Array(9)].map((item, i) => (
              <BattlePlayerCell
                key={i}
                i={i + 1}
                gameResult={gameResult}
                currentSymbol={currentSymbol}
                playerXMoves={playerXMoves}
                playerOMoves={playerOMoves}
                handleCellClick={handleCellClick}
              />
            ))}
          </div>
        </div>
        {gameResult && (
          <div className="endgame">
            <div className="endgame-buttons-wrapper">
              <button className="button" onClick={handleGameReset}>
                New Round
              </button>
              <button className="button" onClick={handlePlayerReset}>
                Reset Players
              </button>
            </div>
          </div>
        )}
        {errorMessage && (
          <ErrorMessage className="error-message" text={errorMessage} />
        )}
      </div>
    </div>
  );
};

export default BattlePlayer;