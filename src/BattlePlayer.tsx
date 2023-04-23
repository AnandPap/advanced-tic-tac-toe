import { useEffect, useState } from "react";
import Cell from "./Cell";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "./redux/hooks";
import { useDispatch } from "react-redux";
import { setPlayers } from "./redux/tictactoe";

const BattlePlayer = () => {
  const [currentSymbol, setCurrentSymbol] = useState("X");
  const [gameId, setGameId] = useState(1);
  const [results, setResults] = useState({ wins1: 0, wins2: 0, ties: 0 });
  const [errorMessage, setErrorMessage] = useState("");
  const [gameResult, setGameResult] = useState<string | null>(null);
  const [player1Moves, setPlayer1Moves] = useState<number[]>([]);
  const [player2Moves, setPlayer2Moves] = useState<number[]>([]);
  const [firstMove, setFirstMove] = useState("");
  const [errorTimeoutId, setErrorTimeoutId] = useState<number | undefined>(
    undefined
  );
  const theme = useAppSelector((s) => s.tictactoe.theme);
  const players = useAppSelector((s) => s.tictactoe.players);
  const dispach = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams({
    player1: "",
    player2: "",
  });
  const player1Name = searchParams.get("player1");
  const player2Name = searchParams.get("player2");
  const navigate = useNavigate();
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
    if (player1Moves.length > 0 || player2Moves.length > 0) checkWinner();
  }, [player1Moves, player2Moves]);

  useEffect(() => {
    setFirstMove(gameId % 2 === 1 ? `player1` : `player2`);
    if (!gameResult) {
      setPlayer1Moves([]);
      setPlayer2Moves([]);
    }
  }, [gameResult]);

  useEffect(() => {
    if (
      player1Name &&
      player2Name &&
      player1Name.length > 1 &&
      player2Name.length > 1
    ) {
      dispach(setPlayers({ player1: player1Name, player2: player2Name }));
    } else if (players.player1.length > 1 && players.player2.length > 1) {
      setSearchParams(
        { player1: players.player1, player2: players.player2 },
        { replace: true }
      );
    } else {
      navigate("/vs-player", { replace: true });
    }
  }, []);

  function gameReset() {
    setCurrentSymbol("X");
    setGameResult(null);
  }

  function handlePlayerReset() {
    navigate("/vs-player", { replace: true });
    // setPlayers({
    //   player1: "",
    //   player2: "",
    // });
    // setGameId(1);
    // setGameResult(null);
    // setCurrentSymbol("X");
    // setResults({ wins1: 0, wins2: 0, ties: 0 });
  }

  function checkWinner() {
    for (let i = 0; i < winningPatterns.length; i++) {
      let winningPattern = winningPatterns[i];
      if (
        winningPattern.every((value) => player1Moves.includes(value)) ||
        winningPattern.every((value) => player2Moves.includes(value))
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
    if (player1Moves.length + player2Moves.length === 9) {
      setResults((s) => ({ ...s, ties: s.ties + 1 }));
      setGameResult("tie");
      setGameId((s) => s + 1);
      return;
    }
    if (currentSymbol === "X") setCurrentSymbol("O");
    else setCurrentSymbol("X");
  }

  return (
    <div className={`${theme} game-screen`}>
      {!gameResult ? (
        <p className="players-turn">
          It's
          {firstMove === "player1" &&
            (currentSymbol === "X"
              ? ` ${players.player1}`
              : ` ${players.player2}`)}
          {firstMove === "player2" &&
            (currentSymbol === "X"
              ? ` ${players.player2}`
              : ` ${players.player1}`)}
          's turn.
        </p>
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
            <Cell
              key={i}
              i={i + 1}
              gameResult={gameResult}
              currentSymbol={currentSymbol}
              setPlayer1Moves={setPlayer1Moves}
              setPlayer2Moves={setPlayer2Moves}
              setErrorMessage={setErrorMessage}
              errorTimeoutId={errorTimeoutId}
              setErrorTimeoutId={setErrorTimeoutId}
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
  );
};

export default BattlePlayer;
