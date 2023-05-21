import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default HomePage;
