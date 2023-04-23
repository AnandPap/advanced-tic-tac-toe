import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import HomePage from "./HomePage";
import Scoreboard from "./Scoreboard";
import PlayerProfile from "./PlayerProfile";
import BattleComputer from "./BattleComputer";
import ChooseComputerDifficulty from "./ChooseComputerDifficulty";
import ChoosePlayers from "./ChoosePlayers";
import Header from "./Header";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vs-computer" element={<ChooseComputerDifficulty />} />
        <Route path="/vs-computer/:difficulty" element={<BattleComputer />} />
        <Route path="/vs-player" element={<ChoosePlayers />} />
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
