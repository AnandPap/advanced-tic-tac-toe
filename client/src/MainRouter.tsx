import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorMessage from "./main-components/ErrorMessage";
import HomePage from "./main-components/HomePage";
import Scoreboard from "./main-components/Scoreboard";
import PlayerProfile from "./main-components/PlayerProfile";
import BattleComputer from "./main-components/BattleComputer";
import ChooseDifficulty from "./main-components/ChooseDifficulty";
import ChoosePlayers from "./main-components/ChoosePlayers";
import Header from "./header/Header";
import BattlePlayer from "./main-components/BattlePlayer";
import BodyWrapper from "./main-components/BodyWrapper";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<BodyWrapper />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/vs-computer" element={<ChooseDifficulty />} />
          <Route path="/vs-computer/:difficulty" element={<BattleComputer />} />
          <Route path="/vs-player" element={<ChoosePlayers />} />
          <Route path="/vs-player/battle" element={<BattlePlayer />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
          <Route
            path="/scoreboard/player-profile/:playerName"
            element={<PlayerProfile />}
          />
          <Route
            path="*"
            element={
              <ErrorMessage className="not-found" text="Page not found" />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
