import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "./redux/hooks";
import { useDispatch } from "react-redux";
import BackButton from "./header/BackButton";
import Cell from "./Cell";

const BattleComputer = () => {
  const [currentSymbol, setCurrentSymbol] = useState("X");
  const [errorMessage, setErrorMessage] = useState("");
  const [gameResult, setGameResult] = useState<string | null>(null);
  const [playerXMoves, setPlayerXMoves] = useState<number[]>([]);
  const [playerOMoves, setPlayerOMoves] = useState<number[]>([]);
  const [firstMove, setFirstMove] = useState("");
  const [removedCell, setRemovedCell] = useState<number | undefined>(undefined);
  const [errorTimeoutId, setErrorTimeoutId] = useState<number | undefined>(
    undefined
  );
  const theme = useAppSelector((s) => s.tictactoe.theme);
  const players = useAppSelector((s) => s.tictactoe.players);
  const playAs = useAppSelector((s) => s.tictactoe.playAs);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { difficulty } = useParams();

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
    if (playAs === "random") {
      const number = Math.floor(Math.random() * 2) + 1;
      if (number % 2 === 0) setFirstMove("human");
      else setFirstMove("computer");
    }
    if (
      difficulty !== "easy" &&
      difficulty !== "medium" &&
      difficulty !== "hard"
    )
      navigate("/vs-computer", { replace: true });
  }, []);

  function checkWinner() {
    for (let i = 0; i < winningPatterns.length; i++) {
      let winningPattern = winningPatterns[i];
      if (
        winningPattern.every((value) => playerXMoves.includes(value)) ||
        winningPattern.every((value) => playerOMoves.includes(value))
      ) {
        if (
          (gameId % 2 === 1 && currentSymbol === "X") ||
          (gameId % 2 === 0 && currentSymbol === "O")
        ) {
          setResults((s) => ({ ...s, wins1: s.wins1 + 1 }));
          setGameResult("player1 won");
        } else {
          setResults((s) => ({ ...s, wins2: s.wins2 + 1 }));
          setGameResult("player2 won");
        }
        setGameId((s) => s + 1);
        return;
      }
    }
    if (playerXMoves.length + playerOMoves.length === 9) {
      setResults((s) => ({ ...s, ties: s.ties + 1 }));
      setGameResult("tie");
      setGameId((s) => s + 1);
      return;
    }
    if (currentSymbol === "X") setCurrentSymbol("O");
    else setCurrentSymbol("X");
  }

  function gameReset() {
    setCurrentSymbol("X");
    setGameResult(null);
  }

  function removeElementFromPlayer1() {
    let tempArray = [...playerXMoves];
    setRemovedCell(tempArray.pop());
    setPlayerXMoves(tempArray);
  }

  function removeElementFromPlayer2() {
    let tempArray = [...playerOMoves];
    setRemovedCell(tempArray.pop());
    setPlayerOMoves(tempArray);
  }

  function undoHandler() {
    removeElementFromPlayer2();
    removeElementFromPlayer1();
  }

  function handlePlayerReset() {
    navigate("/vs-computer", { replace: true });
  }

  return (
    <div className={`${theme} game-screen-wrapper`}>
      <div className="game-screen">
        {!gameResult ? (
          <div className="game-status-bar">
            {(firstMove === "human" && currentSymbol === "X") ||
            (firstMove === "computer" && currentSymbol === "O") ? (
              <p className="players-turn">
                It's {`${players.player1}`} 's turn.
              </p>
            ) : (
              <p>Computer is thinking ...</p>
            )}
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
              ? "It's a Tie!"
              : gameResult === "player won"
              ? `${players.player1} wins!`
              : "Computer wins!"}
          </p>
        )}
        <div className="board-wrapper">
          <div className="board-container">
            {[...Array(9)].map((item, i) => (
              <Cell
                key={i}
                i={i + 1}
                gameResult={gameResult}
                currentSymbol={currentSymbol}
                setPlayerXMoves={setPlayerXMoves}
                setPlayerOMoves={setPlayerOMoves}
                setErrorMessage={setErrorMessage}
                errorTimeoutId={errorTimeoutId}
                setErrorTimeoutId={setErrorTimeoutId}
                removedCell={removedCell}
                setRemovedCell={setRemovedCell}
              />
            ))}
          </div>
        </div>
        {gameResult && (
          <div className="endgame">
            <div className="endgame-buttons-wrapper">
              <button className="button" onClick={gameReset}>
                New Round
              </button>
              <button className="button" onClick={handlePlayerReset}>
                Reset Player
              </button>
            </div>
          </div>
        )}
        {errorMessage && (
          <p className={`error-message ${theme}`}>{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default BattleComputer;
