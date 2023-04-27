import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import UndoButton from "../header/BackButton";
import BattleComputerCell from "./BattleComputerCell";
import ErrorMessage from "../ErrorMessage";
import {
  checkCurrentTurn,
  checkBestMove,
  checkWinner,
  makeRandomMove,
} from "../helper-functions";

const BattleComputer = () => {
  const [currentSymbol, setCurrentSymbol] = useState<"X" | "O">("X");
  const [results, setResults] = useState({ human: 0, computer: 0, tie: 0 });
  const [computerThinking, setComputerThinking] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [gameResult, setGameResult] = useState<
    "human" | "computer" | "tie" | null
  >(null);
  const [playerXMoves, setPlayerXMoves] = useState<number[]>([]);
  const [playerOMoves, setPlayerOMoves] = useState<number[]>([]);
  const [firstMove, setFirstMove] = useState<"human" | "computer" | null>(null);
  const [errorTimeoutId, setErrorTimeoutId] = useState<number | undefined>(
    undefined
  );
  const randomNumber = useMemo(
    () => Math.floor(Math.random() * 2) + 1,
    [gameResult]
  );
  const theme = useAppSelector((s) => s.tictactoe.theme);
  const players = useAppSelector((s) => s.tictactoe.players);
  const playAs = useAppSelector((s) => s.tictactoe.playAs);
  const navigate = useNavigate();
  const { difficulty } = useParams();

  useEffect(() => {
    if (
      (difficulty !== "easy" &&
        difficulty !== "medium" &&
        difficulty !== "hard") ||
      !players.player1
    )
      navigate("/vs-computer", { replace: true });
  }, []);

  useEffect(() => {
    if (!gameResult) {
      if ((playAs === "Random" && randomNumber % 2 === 0) || playAs === "X") {
        setFirstMove("human");
        setComputerThinking(false);
      } else {
        setFirstMove("computer");
        setComputerThinking(true);
      }

      setPlayerXMoves([]);
      setPlayerOMoves([]);
    }
  }, [gameResult]);

  useEffect(() => {
    const result = checkWinner(
      playerXMoves,
      playerOMoves,
      firstMove,
      currentSymbol
    );
    if (result) {
      setGameResult(result);
      setResults((s) => ({ ...s, [result]: s[result] + 1 }));
    } else {
      if ((playerXMoves.length + playerOMoves.length) % 2 === 0)
        setCurrentSymbol("X");
      else setCurrentSymbol("O");
      if (
        checkCurrentTurn(firstMove, currentSymbol) === "human" &&
        playerXMoves.length > 0
      )
        setComputerThinking(true);
    }
  }, [playerXMoves, playerOMoves]);

  useEffect(() => {
    if (computerThinking && !gameResult) {
      setTimeout(() => {
        let moveToMake: number;
        if (difficulty === "easy") moveToMake = easyMove();
        else if (difficulty === "medium") moveToMake = mediumMove();
        else moveToMake = mediumMove();
        if (currentSymbol === "X") setPlayerXMoves((s) => [...s, moveToMake]);
        else setPlayerOMoves((s) => [...s, moveToMake]);
        setComputerThinking(false);
        setErrorMessage("");
      }, 1500);
    }
  }, [computerThinking]);

  function easyMove() {
    return makeRandomMove(playerXMoves, playerOMoves);
  }

  function mediumMove() {
    let moveToMake = checkBestMove(playerXMoves, playerOMoves, currentSymbol);
    if (moveToMake) return moveToMake;
    else return makeRandomMove(playerXMoves, playerOMoves);
  }

  // left to implement
  function hardMove() {}

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
    removeElementFromPlayer1();
    removeElementFromPlayer2();
  }

  function handleGameReset() {
    setGameResult(null);
  }

  function handlePlayerReset() {
    navigate("/vs-computer", { replace: true });
  }

  function handleCellClick(cellInput: string | null, i: number) {
    clearTimeout(errorTimeoutId);
    if (!cellInput && !gameResult && !computerThinking) {
      if (currentSymbol === "X") setPlayerXMoves((s) => [...s, i]);
      else if (currentSymbol === "O") setPlayerOMoves((s) => [...s, i]);
      setErrorMessage("");
    } else if (!gameResult && !computerThinking) {
      setErrorMessage("Choose unoccupied cell!");
      const timeoutId = setTimeout(() => setErrorMessage(""), 2000);
      setErrorTimeoutId(timeoutId);
    } else if (!gameResult && computerThinking) {
      setErrorMessage("Computer is thinking!");
      const timeoutId = setTimeout(() => setErrorMessage(""), 2000);
      setErrorTimeoutId(timeoutId);
    }
  }

  return (
    <div className={`${theme} battle-screen-wrapper`}>
      <div className="battle-screen">
        {!gameResult ? (
          <div className="battle-status-bar">
            {computerThinking ? (
              <div className="computer-is-thinking-wrapper">
                <span className="thinking-large">Computer is thinking</span>
                <span className="thinking-small">AI thinking</span>
                <div className={`dot-elastic ${theme}`}></div>
              </div>
            ) : (
              <p className="players-turn">
                It's {`${players.player1}`} 's turn.
              </p>
            )}
            {playerXMoves.length + playerOMoves.length > 0 &&
              !computerThinking && (
                <div className="undo-button-wrapper">
                  <UndoButton
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
              ? "It's a Tie!"
              : gameResult === "human"
              ? `${players.player1} wins!`
              : "Computer wins!"}
          </p>
        )}
        <div className="board-wrapper">
          <div className="board-container">
            {[...Array(9)].map((item, i) => (
              <BattleComputerCell
                key={i}
                i={i + 1}
                computerThinking={computerThinking}
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
                Reset Player
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

export default BattleComputer;
