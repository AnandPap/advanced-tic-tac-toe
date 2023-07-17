import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import BackButton from "../header/BackButton";
import Cell from "./Cell";
import ErrorMessage from "./ErrorMessage";
import helperFunctions from "../helpers/helper-functions";

type Winner = "human" | "computer" | "tie" | null;

const BattleComputer = () => {
  const [humanMoves, setHumanMoves] = useState<number[]>([]);
  const [computerMoves, setComputerMoves] = useState<number[]>([]);
  const [currentSymbol, setCurrentSymbol] = useState<"X" | "O">("X");
  const [score, setScore] = useState({ human: 0, computer: 0, tie: 0 });
  const [computerThinking, setComputerThinking] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [winner, setWinner] = useState<Winner>(null);
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
    randomMove,
    checkBestMove,
    checkIfFirstAdjacent,
    responseToAdjacentMove,
    makeCornerMove,
    makeAdjacentMove,
  } = helperFunctions(humanMoves, computerMoves);

  useEffect(() => {
    if (!player || player.length < 2)
      navigate("/vs-computer", { replace: true });
    else handleNewGame();
  }, []);

  useEffect(() => {
    if (computerThinking) makeComputerMove();
  }, [computerThinking]);

  function mediumMove() {
    let moveToMake = checkBestMove("winning");
    if (!moveToMake) moveToMake = checkBestMove("blocking");
    if (moveToMake) return moveToMake;
    return randomMove();
  }

  function hardMove() {
    let moveToMake = checkBestMove("winning");
    if (!moveToMake) moveToMake = checkBestMove("blocking");
    if (moveToMake) return moveToMake;
    else {
      const madeMoves = [...humanMoves, ...computerMoves];
      if (currentSymbol === "X") {
        if (madeMoves.length === 0) {
          return makeCornerMove();
        } else if (madeMoves.length === 2) {
          // moze lukaviji potez
          if (humanMoves[0] === 5) return 10 - computerMoves[0];
          else if (computerMoves[0] + humanMoves[0] === 10)
            return makeCornerMove();
          else if (checkIfFirstAdjacent()) return responseToAdjacentMove();
          else if (/^1|3|7|9$/.test(humanMoves[0].toString()))
            return makeCornerMove("adjacentCorner");
          else return 5;
        } else if (madeMoves.length === 4) {
          if (checkIfFirstAdjacent()) return 5;
          else return makeCornerMove();
        }
      } else if (currentSymbol === "O") {
        if (madeMoves.length === 1) {
          if (humanMoves[0] === 5) return makeCornerMove();
          else if (/^1|3|7|9$/.test(humanMoves[0].toString())) return 5;
          else return makeAdjacentMove();
        }
        if (madeMoves.length === 3) {
          if (humanMoves[0] === 5) return makeCornerMove();
          else if (humanMoves[0] + humanMoves[1] === 10)
            return [2, 4, 6, 8][Math.floor(Math.random() * 4)];
          else if (computerMoves[0] !== 5) return 5;
          return 10 - humanMoves[0];
        }
      }
      return randomMove();
    }
  }

  function undoHandler() {
    setErrorMessage("");
    setHumanMoves((s) => s.slice(0, s.length - 1));
    setComputerMoves((s) => s.slice(0, s.length - 1));
  }

  function handleNewGame() {
    setWinner(null);
    setCurrentSymbol("X");
    setHumanMoves([]);
    setComputerMoves([]);
    if ((playAs === "Random" && randomNumber % 2 === 0) || playAs === "X")
      setComputerThinking(false);
    else setComputerThinking(true);
  }

  function handlePlayerReset() {
    navigate("/vs-computer", { replace: true });
  }

  function handleWinner(winner: Winner) {
    if (winner) {
      setErrorMessage("");
      setWinner(winner);
      setScore((s) => ({ ...s, [winner]: s[winner] + 1 }));
    }
  }

  function switchTurn() {
    setComputerThinking((s) => !s);
    setErrorMessage("");
  }

  function handleErrorMessage(errorMessage: string) {
    setErrorMessage(errorMessage);
    const timeoutId = setTimeout(() => setErrorMessage(""), 2000);
    setErrorTimeoutId(timeoutId);
  }

  function handleMoveMade(player: "human" | "computer", cellNumber: number) {
    setCurrentSymbol((s) => (s === "X" ? "O" : "X"));
    const playerMoves = player === "human" ? humanMoves : computerMoves;
    const tempMoves = [...playerMoves, cellNumber];
    player === "human" ? setHumanMoves(tempMoves) : setComputerMoves(tempMoves);
    const winner = checkWinner(tempMoves);
    if (winner) handleWinner(player);
    else if (tempMoves.length + playerMoves.length === 9) handleWinner("tie");
    else {
      switchTurn();
    }
  }

  function makeComputerMove() {
    setTimeout(() => {
      let moveToMake: number;
      if (difficulty === "easy") moveToMake = randomMove();
      else if (difficulty === "medium") moveToMake = mediumMove();
      else moveToMake = hardMove();
      handleMoveMade("computer", moveToMake);
      setComputerThinking(false);
    }, 1000);
  }

  function handleCellClick(cellInput: string | null, i: number) {
    clearTimeout(errorTimeoutId);
    if (!cellInput && !winner && !computerThinking) {
      handleMoveMade("human", i);
    } else if (!winner && !computerThinking)
      handleErrorMessage("Choose unoccupied cell!");
    else if (!winner && computerThinking)
      handleErrorMessage("Computer is thinking!");
  }

  function checkDisabled() {
    if (humanMoves.length > 0) return false;
    return true;
  }

  return difficulty === "easy" ||
    difficulty === "medium" ||
    difficulty === "hard" ? (
    <div className="battle-screen">
      <div className="battle-status-bar">
        {!winner ? (
          computerThinking ? (
            <div className="computer-is-thinking-wrapper">
              <span className="thinking-large">Computer is thinking</span>
              <span className="thinking-small">AI thinking</span>
              <div className="dot-elastic"></div>
            </div>
          ) : (
            <>
              <p className="players-turn">It's {player}'s turn.</p>
              <div className="undo-button-wrapper">
                <BackButton
                  className="undo-button"
                  text="Undo"
                  onClick={undoHandler}
                  disabled={checkDisabled()}
                />
              </div>
            </>
          )
        ) : (
          <p className="computer-winner-text">
            {winner === "tie"
              ? "It's a Tie!"
              : winner === "human"
              ? `${player} wins!`
              : "Computer wins!"}
          </p>
        )}
      </div>
      <div className="board-wrapper">
        <div className="board-container">
          {[...Array(9)].map((item, i) => (
            <Cell
              key={i}
              i={i + 1}
              winner={winner}
              currentSymbol={currentSymbol}
              humanMoves={humanMoves}
              computerMoves={computerMoves}
              handleCellClick={handleCellClick}
              computerThinking={computerThinking}
            />
          ))}
        </div>
      </div>
      {winner && (
        <div className="endgame">
          <div className="endgame-buttons-wrapper">
            <button className="button" onClick={handleNewGame}>
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
    <ErrorMessage className="not-found" text="Page not found" />
  );
};

export default BattleComputer;
