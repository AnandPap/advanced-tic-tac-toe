import { configureStore } from "@reduxjs/toolkit";
import tictactoeReducer, { InitialState } from "./tictactoe";

export const store = configureStore({
  reducer: {
    tictactoe: tictactoeReducer,
  },
  preloadedState: loadFromSessionStorage(),
});

function loadFromSessionStorage() {
  try {
    const serialisedState = sessionStorage.getItem("reduxStore");
    if (serialisedState) {
      return JSON.parse(serialisedState);
    } else {
      const newReduxStore = {
        tictactoe: {
          darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
          additionalDarkModeClass: false,
          playAs: "Random",
        },
      };
      return newReduxStore;
    }
  } catch (err) {
    console.warn(err);
    return undefined;
  }
}

function saveToSessionStorage(state: { tictactoe: InitialState }) {
  try {
    const serialState = JSON.stringify(state);
    sessionStorage.setItem("reduxStore", serialState);
  } catch (e) {
    console.warn(e);
  }
}

store.subscribe(() => saveToSessionStorage(store.getState()));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
