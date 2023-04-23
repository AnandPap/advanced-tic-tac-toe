import { useNavigate } from "react-router-dom";
import { useAppSelector } from "./redux/hooks";

const HomePage = () => {
  const navigate = useNavigate();
  const theme = useAppSelector((s) => s.tictactoe.theme);

  return (
    <div className={`${theme} home-page`}>
      <p>Play against:</p>
      <div className="button-wrapper">
        <button className="button" onClick={() => navigate("/vs-computer")}>
          Computer
        </button>
        <button className="button" onClick={() => navigate("/vs-player")}>
          Human player
        </button>
      </div>
    </div>
  );
};

export default HomePage;
