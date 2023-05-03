import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const HomePage = () => {
  const navigate = useNavigate();
  const theme = useAppSelector((s) => s.tictactoe.theme);

  return (
    <div className={`home-page-wrapper ${theme}`}>
      <div className="home-page">
        <p>Play against:</p>
        <div className="home-page-buttons-wrapper">
          <button className="button" onClick={() => navigate("/vs-computer")}>
            Computer
          </button>
          <button className="button" onClick={() => navigate("/vs-player")}>
            Human player
          </button>
        </div>
        <p>Check results:</p>
        <div className="home-page-buttons-wrapper">
          <button className="button" onClick={() => navigate("/scoreboard")}>
            Scoreboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
