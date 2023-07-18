import React from "react";
import ReactDOM from "react-dom/client";
import MainRouter from "./MainRouter";
import ErrorBoundary from "./reusable/ErrorBoundary";
import ErrorMessage from "./reusable/ErrorMessage";
import "./styles/index.css";
import "./styles/header.css";
import "./styles/pre-battle.css";
import "./styles/battle.css";
import "./styles/scoreboard.css";
import "./styles/reusable.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary
        fallback={
          <ErrorMessage
            className="not-found error-boundary"
            text={
              "Something went wrong. \n Please refresh the page and try again."
            }
          />
        }
      >
        <MainRouter />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);
