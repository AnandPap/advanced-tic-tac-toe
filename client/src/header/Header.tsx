import { useLocation, useNavigate } from "react-router-dom";
import tictactoePng from "../assets/tic-tac-toe.png";
import HamburgerMenu from "./HamburgerMenu";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  function navigateHome() {
    if (location.pathname !== "/home") navigate("/home");
  }

  return (
    <header className="header">
      <div onClick={navigateHome} className="header-left">
        <img
          className="header-icon"
          title="Tic Tac Toe"
          alt="App Icon"
          src={tictactoePng}
        />
        <h1 className="header-title">Tic-Tac-Toe</h1>
      </div>
      <HamburgerMenu />
    </header>
  );
};

export default Header;
