import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { useDispatch } from "react-redux";
import { setPlayAs, setPlayers } from "../redux/tictactoe";
import { useEffect, useState } from "react";
import ErrorMessage from "../ErrorMessage";

const ChooseDifficulty = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    "medium"
  );
  const levelsOfDifficulty = ["easy", "medium", "hard"];
  const playAsOptions = ["O", "Random", "X"];
  const theme = useAppSelector((s) => s.tictactoe.theme);
  const players = useAppSelector((s) => s.tictactoe.players);
  const playAs = useAppSelector((s) => s.tictactoe.playAs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setPlayAs("Random"));
  }, []);

  return (
    <div className={`choose-difficulty-wrapper ${theme}`}>
      <div className="choose-difficulty">
        <p>Choose difficulty:</p>
        <div className="choose-difficulty-buttons-wrapper">
          {levelsOfDifficulty.map((difficulty, i) => {
            return (
              <button
                disabled={selectedDifficulty === difficulty}
                className={`${difficulty} ${
                  selectedDifficulty === difficulty
                    ? "selected-difficulty"
                    : null
                }`}
                key={i}
                onClick={() => setSelectedDifficulty(difficulty)}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </button>
            );
          })}
        </div>
      </div>
      <div className="play-as">
        <p>Play as:</p>
        <div className="play-as-buttons-wrapper">
          {playAsOptions.map((option, i) => {
            return (
              <button
                className={`${option === playAs && playAs}`}
                key={i}
                onClick={() => dispatch(setPlayAs(option))}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
      <form className={`${theme} computer-form`}>
        <p>Enter players name:</p>
        <input
          type="text"
          value={players.player1}
          onChange={(e) => {
            dispatch(setPlayers({ player1: e.target.value }));
            setErrorMessage("");
          }}
        />
      </form>
      <button
        onClick={() => {
          if (!players.player1) setErrorMessage("Please enter players name.");
          else if (selectedDifficulty)
            navigate(`/vs-computer/${selectedDifficulty}`);
          else if (!selectedDifficulty)
            setErrorMessage("Please select computer difficulty.");
        }}
        className="button"
      >
        Start battle
      </button>
      {errorMessage && (
        <ErrorMessage className="error-message" text={errorMessage} />
      )}
    </div>
  );
};

export default ChooseDifficulty;
