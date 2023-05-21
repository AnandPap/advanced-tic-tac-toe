import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface InitialStateType {
  theme: "dark" | "light";
  playAs: string;
  players: PlayersType;
}

interface PlayersType {
  player1: string;
  player2: string;
}

type PlayersActionType = {
  [key: string]: string;
};

export const initialState: InitialStateType = {
  theme: "dark",
  playAs: "Random",
  players: { player1: "", player2: "" },
};

export const tictactoeSlice = createSlice({
  name: "tictactoe",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"dark" | "light">) => {
      state.theme = action.payload;
    },
    setPlayAs: (state, action: PayloadAction<string>) => {
      state.playAs = action.payload;
    },
    setPlayers: (state, action: PayloadAction<PlayersActionType>) => {
      state.players = { ...state.players, ...action.payload };
    },
  },
});

export const { setTheme, setPlayAs, setPlayers } = tictactoeSlice.actions;

export default tictactoeSlice.reducer;
