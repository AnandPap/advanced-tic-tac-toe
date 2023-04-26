import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import BackButton from "../header/BackButton";
import BattleComputerCell from "./BattleComputerCell";

const BattleComputer = () => {
  const [currentSymbol, setCurrentSymbol] = useState("X");
  const [results, setResults] = useState({ human: 0, computer: 0, tie: 0 });
  const [computerThinking, setComputerThinking] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [gameResult, setGameResult] = useState<string | null>(null);
  const [playerXMoves, setPlayerXMoves] = useState<number[]>([]);
  const [playerOMoves, setPlayerOMoves] = useState<number[]>([]);
  const [firstMove, setFirstMove] = useState("");
  const [removedCell, setRemovedCell] = useState<number | undefined>(undefined);
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
    if (!gameResult) {
      if (playAs === "Random") {
        if (randomNumber % 2 === 0) setFirstMove("human");
        else {
          setFirstMove("computer");
          setComputerThinking(true);
        }
      } else if (playAs === "X") {
        setFirstMove("human");
      } else {
        setFirstMove("computer");
        setComputerThinking(true);
      }
      setPlayerXMoves([]);
      setPlayerOMoves([]);
    }

    if (
      (difficulty !== "easy" &&
        difficulty !== "medium" &&
        difficulty !== "hard") ||
      !players.player1
    )
      navigate("/vs-computer", { replace: true });
  }, [gameResult]);

  useEffect(() => {
    if (playerXMoves.length > 0 && !removedCell) {
      const result = checkWinner();
      if (result) {
        setGameResult(`${result} won`);
        setResults((s) => ({ ...s, [result]: s[result] + 1 }));
      }
      if (currentSymbol === "X") setCurrentSymbol("O");
      else setCurrentSymbol("X");
      if (checkCurrentTurn() === "human") setComputerThinking(true);
    }
  }, [playerXMoves, playerOMoves]);

  useEffect(() => {
    if (computerThinking && !gameResult) {
      setTimeout(() => {
        if (difficulty === "easy") easyMove();
        else if (difficulty === "medium") easyMove();
        else easyMove();
        setComputerThinking(false);
      }, 2000);
    }
  }, [computerThinking]);

  function easyMove() {
    const availableMoves: number[] = [];
    const madeMoves = [...playerOMoves, ...playerXMoves];
    for (let i = 1; i < 10; i++) {
      if (!madeMoves.includes(i)) availableMoves.push(i);
    }
    const randomNumber = Math.floor(Math.random() * availableMoves.length);
    if (currentSymbol === "O")
      setPlayerOMoves((s) => [...s, availableMoves[randomNumber]]);
    else setPlayerXMoves((s) => [...s, availableMoves[randomNumber]]);
  }

  // left to implement
  function mediumMove() {}

  // left to implement
  function hardMove() {}

  function checkWinner() {
    for (let i = 0; i < winningPatterns.length; i++) {
      let winningPattern = winningPatterns[i];
      if (checkWinningPattern(winningPattern)) {
        if (checkCurrentTurn() === "human") return "human";
        else return "computer";
      }
    }
    if (playerXMoves.length + playerOMoves.length === 9) return "tie";
    return null;
  }

  function checkCurrentTurn() {
    if (
      (firstMove === "human" && currentSymbol === "X") ||
      (firstMove === "computer" && currentSymbol === "O")
    )
      return "human";
    else return "computer";
  }

  function checkWinningPattern(winningPattern: number[]) {
    if (
      winningPattern.every((value) => playerXMoves.includes(value)) ||
      winningPattern.every((value) => playerOMoves.includes(value))
    )
      return true;
    else return false;
  }

  function removeElementFromPlayer1() {
    let tempArray = [...playerXMoves];
    setPlayerXMoves(tempArray);
  }

  function removeElementFromPlayer2() {
    let tempArray = [...playerOMoves];
    setPlayerOMoves(tempArray);
  }

  function undoHandler() {
    removeElementFromPlayer1();
    removeElementFromPlayer2();
  }

  function gameReset() {
    setCurrentSymbol("X");
    setGameResult(null);
    setComputerThinking(false);
  }

  function handlePlayerReset() {
    navigate("/vs-computer", { replace: true });
  }

  return (
    <div className={`${theme} battle-screen-wrapper`}>
      <div className="battle-screen">
        {!gameResult ? (
          <div className="battle-status-bar">
            {checkCurrentTurn() === "human" ? (
              <p className="players-turn">
                It's {`${players.player1}`} 's turn.
              </p>
            ) : (
              <div className="computer-is-thinking-wrapper">
                <span className="thinking-large">Computer is thinking</span>
                <span className="thinking-small">AI thinking</span>
                <div className={`dot-elastic ${theme}`}></div>
              </div>
            )}
            {/* {playerXMoves.length + playerOMoves.length > 0 &&
              checkCurrentTurn() === "human" && (
                <div className="undo-button-wrapper">
                  <BackButton
                    className={`${theme} undo-button`}
                    text="Undo"
                    onClick={undoHandler}
                  />
                </div>
              )} */}
          </div>
        ) : (
          <p className="winner-text">
            {gameResult === "tie"
              ? "It's a Tie!"
              : gameResult === "human won"
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
