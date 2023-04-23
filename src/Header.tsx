import tictactoePng from "./assets/tic-tac-toe.png";
import LottieDarkModeSwitch from "./LottieDarkModeSwitch";
import { useAppSelector } from "./redux/hooks";

const Header = () => {
  const theme = useAppSelector((s) => s.tictactoe.theme);

  return (
    <header className={`${theme}-header header`}>
      <img className="app-icon" alt="App Icon" src={tictactoePng} />
      <LottieDarkModeSwitch />
    </header>
  );
};

export default Header;
