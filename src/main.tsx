import React from "react";
import ReactDOM from "react-dom/client";
import MainRouter from "./MainRouter";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <MainRouter />
    </Provider>
  </React.StrictMode>
);
