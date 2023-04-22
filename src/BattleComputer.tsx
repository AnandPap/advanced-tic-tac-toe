import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BattleComputer = () => {
  const navigate = useNavigate();
  const { difficulty } = useParams();

  useEffect(() => {
    if (
      difficulty !== "easy" &&
      difficulty !== "medium" &&
      difficulty !== "hard"
    )
      navigate("/vs-computer", { replace: true });
  }, []);

  return <div>{difficulty}</div>;
};

export default BattleComputer;
