import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { useDispatch } from "react-redux";
import { setPlayers } from "../redux/tictactoe";
import BattlePlayerCell from "./BattlePlayerCell";
import BackButton from "../header/BackButton";

const BattlePlayer = () => {
  const [currentSymbol, setCurrentSymbol] = useState("X");
  const [gameId, setGameId] = useState(1);
  const [results, setResults] = useState({ wins1: 0, wins2: 0, ties: 0 });
  const [errorMessage, setErrorMessage] = useState("");
  const [gameResult, setGameResult] = useState<string | null>(null);
  const [playerXMoves, setPlayerXMoves] = useState<number[]>([]);
  const [playerOMoves, setPlayerOMoves] = useState<number[]>([]);
  const [removedCell, setRemovedCell] = useState<number | undefined>(undefined);
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
    if (!gameResult) {
      setPlayerXMoves([]);
      setPlayerOMoves([]);
    }
  }, [gameResult]);

  useEffect(() => {
    if (playerXMoves.length > 0 && !removedCell) {
      checkWinner();
      if (currentSymbol === "X") setCurrentSymbol("O");
      else setCurrentSymbol("X");
    }
  }, [playerXMoves, playerOMoves]);

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

  function checkWinner() {
    for (let i = 0; i < winningPatterns.length; i++) {
      let winningPattern = winningPatterns[i];
      if (checkWinningPattern(winningPattern)) {
        if (checkCurrentTurn() === "player1") {
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
  }

  function checkCurrentTurn() {
    if (
      (gameId % 2 === 1 && currentSymbol === "X") ||
      (gameId % 2 === 0 && currentSymbol === "O")
    )
      return "player1";
    else return "player2";
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
    setRemovedCell(tempArray.pop());
    setPlayerXMoves(tempArray);
  }

  function removeElementFromPlayer2() {
    let tempArray = [...playerOMoves];
    setRemovedCell(tempArray.pop());
    setPlayerOMoves(tempArray);
  }

  function undoHandler() {
    setErrorMessage("");
    if (currentSymbol === "X") removeElementFromPlayer2();
    else removeElementFromPlayer1();
    if (currentSymbol === "X") setCurrentSymbol("O");
    else setCurrentSymbol("X");
  }

  function gameReset() {
    setCurrentSymbol("X");
    setGameResult(null);
  }

  function handlePlayerReset() {
    navigate("/vs-player", { replace: true });
  }

  return (
    <div className={`${theme} battle-screen-wrapper`}>
      <div className="battle-screen">
        {!gameResult ? (
          <div className="battle-status-bar">
            <p className="players-turn">
              It's
              {checkCurrentTurn() === "player1"
                ? ` ${players.player1}`
                : ` ${players.player2}`}
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
              ? "It's a Tie!"
              : gameResult === "player1 won"
              ? `${players.player1} wins!`
              : `${players.player2} wins!`}
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
                Reset Players
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

export default BattlePlayer;
