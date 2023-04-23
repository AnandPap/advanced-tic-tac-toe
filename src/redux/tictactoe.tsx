import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface TictactoeState {
  loading: boolean;
  theme: "dark" | "light";
  playAs: string;
  players: playersType;
}

interface playersType {
  player1: string;
  player2: string;
}

type playersActionType = {
  [key: string]: string;
};

export const initialState: TictactoeState = {
  theme: "dark",
  loading: false,
  playAs: "Random",
  players: { player1: "", player2: "" },
};

export const tictactoeSlice = createSlice({
  name: "tictactoe",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setTheme: (state, action: PayloadAction<"dark" | "light">) => {
      state.theme = action.payload;
    },
    setPlayAs: (state, action: PayloadAction<string>) => {
      state.playAs = action.payload;
    },
    setPlayers: (state, action: PayloadAction<playersActionType>) => {
      state.players = { ...state.players, ...action.payload };
    },
  },
});

export const { setLoading, setTheme, setPlayAs, setPlayers } =
  tictactoeSlice.actions;

export default tictactoeSlice.reducer;
