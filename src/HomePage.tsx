import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      Play against:
      <button onClick={() => navigate("/vs-computer")}>Computer</button>
      <button onClick={() => navigate("/vs-player")}>Human player</button>
    </div>
  );
};

export default HomePage;
