import { useEffect, useMemo, useState } from "react";
import {
  useNavigate,
  useParams,
  useSearchParams,
  // Navigate,
} from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import UndoButton from "../header/BackButton";
import Cell from "./Cell";
import ErrorMessage from "./ErrorMessage";
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
  const playAs = useAppSelector((s) => s.tictactoe.playAs);
  const navigate = useNavigate();
  const { difficulty } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const player = searchParams.get("player");

  const {
    checkWinner,
    checkCurrentTurn,
    makeRandomMove,
    checkBestMove,
    checkIfAdjacent,
    responseToAdjacentMove,
    makeCornerMove,
    makeAdjacentMove,
  } = helperFunctions(playerXMoves, playerOMoves, currentSymbol);

  useEffect(() => {
    if (!player || player.length < 2)
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
    const winner = checkWinner(firstMove);
    if (winner) {
      setWinner(winner);
      setScore((s) => ({ ...s, [winner]: s[winner] + 1 }));
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
        else moveToMake = hardMove();
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

  function hardMove() {
    let moveToMake = checkBestMove("winning");
    if (!moveToMake) moveToMake = checkBestMove("blocking");
    if (moveToMake) return moveToMake;
    else {
      const madeMoves = [...playerXMoves, ...playerOMoves];
      if (currentSymbol === "X") {
        if (madeMoves.length === 0) {
          return makeCornerMove();
        } else if (madeMoves.length === 2) {
          // moze lukaviji potez
          if (playerOMoves[0] === 5) return 10 - playerXMoves[0];
          else if (playerOMoves[0] + playerXMoves[0] === 10)
            return makeCornerMove();
          else if (checkIfAdjacent()) return responseToAdjacentMove();
          else if (/^1|3|7|9$/.test(playerOMoves[0].toString()))
            return makeCornerMove("adjacent");
          else return 5;
        } else if (madeMoves.length === 4) {
          if (playerOMoves[0] + playerXMoves[0] === 10) return makeCornerMove();
          else if (checkIfAdjacent()) return 5;
          else if (/^1|3|7|9$/.test(playerOMoves[0].toString()))
            return makeCornerMove();
        }
      } else if (currentSymbol === "O") {
        if (madeMoves.length === 1) {
          if (playerXMoves[0] === 5) return makeCornerMove();
          else if (/^1|3|7|9$/.test(playerXMoves[0].toString())) return 5;
          else return makeAdjacentMove();
        }
        if (madeMoves.length === 3) {
          if (playerXMoves[0] === 5) return makeCornerMove();
          else if (playerXMoves[0] + playerXMoves[1] === 10)
            return [2, 4, 6, 8][Math.floor(Math.random() * 4)];
          else if (playerOMoves[0] !== 5) return 5;
          return 10 - playerXMoves[0];
        }
      }
      return makeRandomMove();
    }
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

  return difficulty === "easy" ||
    difficulty === "medium" ||
    difficulty === "hard" ? (
    <div className="battle-screen">
      {!winner ? (
        <div className="battle-status-bar">
          {computerThinking ? (
            <div className="computer-is-thinking-wrapper">
              <span className="thinking-large">Computer is thinking</span>
              <span className="thinking-small">AI thinking</span>
              <div className="dot-elastic"></div>
            </div>
          ) : (
            <p className="players-turn">It's {player}'s turn.</p>
          )}
          {((firstMove === "human" &&
            playerXMoves.length + playerOMoves.length > 0) ||
            (firstMove === "computer" &&
              playerXMoves.length + playerOMoves.length > 2)) &&
            !computerThinking && (
              <div className="undo-button-wrapper">
                <UndoButton
                  className="undo-button"
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
            ? `${player} wins!`
            : "Computer wins!"}
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
  ) : (
    // <Navigate to={"/vs-computer"} replace={true} />
    <ErrorMessage className="not-found" text="Page not found" />
  );
};

export default BattleComputer;
