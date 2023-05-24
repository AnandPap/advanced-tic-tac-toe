import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setPlayAs } from "../redux/tictactoe";
import { useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";

const ChooseDifficulty = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    "hard"
  );
  const [player, setPlayer] = useState("");
  const levelsOfDifficulty = ["easy", "medium", "hard"];
  const playAsOptions = ["O", "Random", "X"];
  const playAs = useAppSelector((s) => s.tictactoe.playAs);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setPlayAs("Random"));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (player.length < 2) setErrorMessage("Please enter player's name.");
    else navigate(`/vs-computer/${selectedDifficulty}?player=${player}`);
  };

  return (
    <>
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
      <form className="computer-form" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="player">Enter player's name:</label>
        <input
          id="player"
          type="text"
          value={player}
          autoFocus
          onChange={(e) => {
            setPlayer(e.target.value);
            setErrorMessage("");
          }}
        />
        <button type="submit" className="button">
          Start battle
        </button>
      </form>
      {errorMessage && (
        <ErrorMessage className="error-message" text={errorMessage} />
      )}
    </>
  );
};

export default ChooseDifficulty;
