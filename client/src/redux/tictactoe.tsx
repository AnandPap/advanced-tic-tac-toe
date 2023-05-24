import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  theme: "dark" | "light";
  playAs: string;
}

const initialState: InitialState = {
  theme: "dark",
  playAs: "Random",
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
  },
});

export const { setTheme, setPlayAs } = tictactoeSlice.actions;

export default tictactoeSlice.reducer;
