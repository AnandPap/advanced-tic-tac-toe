import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import LottieDarkModeSwitch from "./LottieDarkModeSwitch";
import HomePage from "./HomePage";
import Scoreboard from "./Scoreboard";
import PlayerProfile from "./PlayerProfile";
import BattleComputer from "./BattleComputer";
import BattlePlayer from "./BattlePlayer";
import tictactoePng from "./assets/tic-tac-toe.png";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <header className="header">
        <img className="app-icon" alt="App Icon" src={tictactoePng} />
        <LottieDarkModeSwitch />
        {/* <div>
          {theme === "dark" ? (
            <i
              onClick={() => dispatch(setTheme("light"))}
              style={{ fontSize: "105px" }}
              className="bi bi-moon-fill"
            ></i>
          ) : (
            <i
              onClick={() => dispatch(setTheme("dark"))}
              style={{ fontSize: "105px" }}
              className="fa-lg bi bi-brightness-high "
            ></i>
          )}
        </div> */}
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vs-computer" element={<BattleComputer />} />
        <Route path="/vs-player" element={<BattlePlayer />} />
        <Route path="/scoreboard" element={<Scoreboard />} />
        <Route path="/scoreboard/:id" element={<PlayerProfile />} />
        <Route
          path="*"
          element={
            <ErrorMessage className="on-empty-page" text="Page not found" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
