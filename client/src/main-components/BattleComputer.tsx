import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import UndoButton from "../header/BackButton";
import BattleComputerCell from "./BattleComputerCell";
import ErrorMessage from "../ErrorMessage";
import helperFunctions from "../helpers/helper-functions";

const BattleComputer = () => {
  const [playerXMoves, setPlayerXMoves] = useState<number[]>([]);
  const [playerOMoves, setPlayerOMoves] = useState<number[]>([]);
  const [currentSymbol, setCurrentSymbol] = useState<"X" | "O">("X");
  const [score, setScore] = useState({ human: 0, computer: 0, tie: 0 });
  const [undoPressed, setUndoPressed] = useState(false);
  const [computerThinking, setComputerThinking] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [winner, setWinner] = useState<"human" | "computer" | "tie" | null>(
    null
  );
  const [firstMove, setFirstMove] = useState<"human" | "computer">("computer");
  const [errorTimeoutId, setErrorTimeoutId] = useState<number | undefined>(
    undefined
  );
  const randomNumber = useMemo(
    () => Math.floor(Math.random() * 2) + 1,
    [winner]
  );
  const theme = useAppSelector((s) => s.tictactoe.theme);
  const playAs = useAppSelector((s) => s.tictactoe.playAs);
  const players = useAppSelector((s) => s.tictactoe.players);
  const navigate = useNavigate();
  const { difficulty } = useParams();

  const { checkWinner, checkCurrentTurn, makeRandomMove, checkBestMove } =
    helperFunctions(playerXMoves, playerOMoves, currentSymbol);

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
    if (!winner) {
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
  }, [winner]);

  useEffect(() => {
    const result = checkWinner(firstMove);
    if (result) {
      setWinner(result);
      setScore((s) => ({ ...s, [result]: s[result] + 1 }));
    } else {
      if ((playerXMoves.length + playerOMoves.length) % 2 === 0)
        setCurrentSymbol("X");
      else setCurrentSymbol("O");
      if (
        checkCurrentTurn(firstMove) === "human" &&
        playerXMoves.length > 0 &&
        !undoPressed
      )
        setComputerThinking(true);
    }
  }, [playerXMoves, playerOMoves]);

  useEffect(() => {
    if (computerThinking && !winner) {
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
    return makeRandomMove();
  }

  function mediumMove() {
    let moveToMake = checkBestMove("winning");
    if (!moveToMake) moveToMake = checkBestMove("blocking");
    if (moveToMake) return moveToMake;
    return makeRandomMove();
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
    setUndoPressed(true);
    setErrorMessage("");
    removeElementFromPlayer1();
    removeElementFromPlayer2();
  }

  function handleGameReset() {
    setWinner(null);
  }

  function handlePlayerReset() {
    navigate("/vs-computer", { replace: true });
  }

  function handleCellClick(cellInput: string | null, i: number) {
    clearTimeout(errorTimeoutId);
    if (!cellInput && !winner && !computerThinking) {
      if (currentSymbol === "X") setPlayerXMoves((s) => [...s, i]);
      else if (currentSymbol === "O") setPlayerOMoves((s) => [...s, i]);
      setUndoPressed(false);
      setErrorMessage("");
    } else if (!winner && !computerThinking) {
      setErrorMessage("Choose unoccupied cell!");
      const timeoutId = setTimeout(() => setErrorMessage(""), 2000);
      setErrorTimeoutId(timeoutId);
    } else if (!winner && computerThinking) {
      setErrorMessage("Computer is thinking!");
      const timeoutId = setTimeout(() => setErrorMessage(""), 2000);
      setErrorTimeoutId(timeoutId);
    }
  }

  return (
    <div className={`${theme} battle-screen-wrapper`}>
      <div className="battle-screen">
        {!winner ? (
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
            {((firstMove === "human" &&
              playerXMoves.length + playerOMoves.length > 0) ||
              (firstMove === "computer" &&
                playerXMoves.length + playerOMoves.length > 2)) &&
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
            {winner === "tie"
              ? "It's a Tie!"
              : winner === "human"
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
                winner={winner}
                currentSymbol={currentSymbol}
                playerXMoves={playerXMoves}
                playerOMoves={playerOMoves}
                handleCellClick={handleCellClick}
                computerThinking={computerThinking}
              />
            ))}
          </div>
        </div>
        {winner && (
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
