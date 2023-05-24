import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  theme: "dark" | "light";
  playAs: string;
  players: Players;
}
interface Players {
  player1: string;
  player2: string;
}
type PlayersAction = {
  [key: string]: string;
};

const initialState: InitialState = {
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
    setPlayers: (state, action: PayloadAction<PlayersAction>) => {
      state.players = { ...state.players, ...action.payload };
    },
  },
});

export const { setTheme, setPlayAs, setPlayers } = tictactoeSlice.actions;

export default tictactoeSlice.reducer;
