import { useNavigate } from "react-router-dom";

const BattleComputer = () => {
  const navigate = useNavigate();

  return (
    <div>
      Choose difficulty:
      <button onClick={() => navigate("/vs-computer/easy")}>Easy</button>
      <button onClick={() => navigate("/vs-computer/medium")}>Medium</button>
      <button onClick={() => navigate("/vs-computer/hard")}>Hard</button>
    </div>
  );
};

export default BattleComputer;
