import { useLocation, useNavigate } from "react-router-dom";
import tictactoePng from "../assets/tic-tac-toe.png";
import BackButton from "./BackButton";
import LottieDarkModeSwitch from "./LottieDarkModeSwitch";
import { useAppSelector } from "../redux/hooks";
import ModalCover from "./ModalCover";
import { useEffect, useRef, useState } from "react";
import HamburgerMenu from "./HamburgerMenu";

const Header = () => {
  const [displayHamburgerContent, setDisplayHamburgerContent] = useState(false);
  const [screenWidth, setScreenWidth] = useState<number | undefined>(undefined);
  const ref = useRef<HTMLDivElement>(null);
  const theme = useAppSelector((s) => s.tictactoe.theme);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (screenWidth === undefined) setScreenWidth(ref.current?.clientWidth);
    window.addEventListener("resize", () =>
      setScreenWidth(ref.current?.clientWidth)
    );
  }, [ref.current?.clientWidth]);

  return (
    <header className={`${theme}-header header`} ref={ref}>
      <img className="app-icon" alt="App Icon" src={tictactoePng} />
      {screenWidth && screenWidth > 400 ? <h1>Tic-Tac-Toe</h1> : null}
      <div
        className={`header-buttons-wrapper hamburger-menu-content ${
          displayHamburgerContent ? "hamburger-open" : "hamburger-close"
        }`}
      >
        {location.pathname !== "/" && (
          <BackButton onClick={() => navigate(-1)} />
        )}
        <LottieDarkModeSwitch />
      </div>
      <ModalCover
        displayHamburgerContent={displayHamburgerContent}
        setDisplayHamburgerContent={setDisplayHamburgerContent}
      />
      <HamburgerMenu
        displayHamburgerContent={displayHamburgerContent}
        setDisplayHamburgerContent={setDisplayHamburgerContent}
      />
    </header>
  );
};

export default Header;
