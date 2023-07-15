import React from "react";
import ReactDOM from "react-dom/client";
import MainRouter from "./MainRouter";
import "./styles/header.css";
import "./styles/pre-battle.css";
import "./styles/battle.css";
import "./styles/index.css";
import "./styles/dots-animation.css";
import "./styles/scoreboard.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ErrorMessage from "./main-components/ErrorMessage";
import ErrorBoundary from "./main-components/ErrorBoundary";

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
