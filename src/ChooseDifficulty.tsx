import { useNavigate } from "react-router-dom";
import { useAppSelector } from "./redux/hooks";
import { useDispatch } from "react-redux";
import { setPlayAs } from "./redux/tictactoe";
import { useEffect } from "react";

const ChooseDifficulty = () => {
  const levelsOfDifficulty = ["easy", "medium", "hard"];
  const playAsOptions = ["O", "Random", "X"];
  const theme = useAppSelector((s) => s.tictactoe.theme);
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
                className={`${difficulty}`}
                key={i}
                onClick={() => navigate(`/vs-computer/${difficulty}`)}
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
    </div>
  );
};

export default ChooseDifficulty;
