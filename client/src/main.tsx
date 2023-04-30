import React from "react";
import ReactDOM from "react-dom/client";
import MainRouter from "./router/MainRouter";
import "./styles/header.css";
import "./styles/pre-battle.css";
import "./styles/battle.css";
import "./styles/index.css";
import "./styles/dots-animation.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <MainRouter />
    </Provider>
  </React.StrictMode>
);
