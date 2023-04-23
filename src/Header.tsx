import { useLocation, useNavigate } from "react-router-dom";
import tictactoePng from "./assets/tic-tac-toe.png";
import BackButton from "./BackButton";
import LottieDarkModeSwitch from "./LottieDarkModeSwitch";
import { useAppSelector } from "./redux/hooks";

const Header = () => {
  const theme = useAppSelector((s) => s.tictactoe.theme);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className={`${theme}-header header`}>
      <img className="app-icon" alt="App Icon" src={tictactoePng} />
      <h1>Tic-Tac-Toe</h1>
      {location.pathname !== "/" && <BackButton onClick={() => navigate(-1)} />}
      <LottieDarkModeSwitch />
    </header>
  );
};

export default Header;
