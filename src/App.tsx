import { useState } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

function App() {
  const [count, setCount] = useState(0);
  const theme = useAppSelector((state) => state.tictactoe.theme);
  const dispatch = useAppDispatch();

  return <div className="App"></div>;
}

export default App;
