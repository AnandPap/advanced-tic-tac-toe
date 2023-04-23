import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface TictactoeState {
  loading: boolean;
  theme: "dark" | "light";
  playAs: string;
}

export const initialState: TictactoeState = {
  theme: "dark",
  loading: false,
  playAs: "Random",
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
  },
});

export const { setLoading, setTheme, setPlayAs } = tictactoeSlice.actions;

export default tictactoeSlice.reducer;
