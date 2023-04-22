import { useNavigate } from "react-router-dom";

const ChooseComputerDifficulty = () => {
  const navigate = useNavigate();
  const levelsOfDifficulty = ["easy", "medium", "hard"];

  return (
    <div>
      Choose difficulty:
      {levelsOfDifficulty.map((difficulty, i) => {
        return (
          <button onClick={() => navigate(`/vs-computer/${difficulty}`)}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </button>
        );
      })}
    </div>
  );
};

export default ChooseComputerDifficulty;
