import { useLocation, useNavigate } from "react-router-dom";
import tictactoePng from "../assets/tic-tac-toe.png";
import BackButton from "./BackButton";
import LottieDarkModeSwitch from "./LottieDarkModeSwitch";
import ModalCover from "./ModalCover";
import { useRef, useState } from "react";
import HamburgerMenu from "./HamburgerMenu";

const Header = () => {
  const [displayContent, setDisplayContent] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="header" ref={ref}>
      <div
        onClick={() => {
          if (location.pathname !== "/home") navigate("/home");
        }}
        className="icon-and-title-wrapper"
      >
        <img className="app-icon" alt="App Icon" src={tictactoePng} />
        <h1>Tic-Tac-Toe</h1>
      </div>
      <div
        className={`header-buttons-wrapper hamburger-menu-content ${
          displayContent && "hamburger-open"
        }`}
      >
        {location.pathname !== "/" && (
          <BackButton
            className="back-button"
            text="Back"
            onClick={() => navigate(-1)}
          />
        )}
        <LottieDarkModeSwitch />
      </div>
      <ModalCover
        displayContent={displayContent}
        setDisplayContent={setDisplayContent}
      />
      <HamburgerMenu
        displayContent={displayContent}
        setDisplayContent={setDisplayContent}
      />
    </header>
  );
};

export default Header;
