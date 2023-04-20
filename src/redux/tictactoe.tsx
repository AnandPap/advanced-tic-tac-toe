import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface TictactoeState {
  loading: boolean;
  theme: "dark" | "light";
}

export const initialState: TictactoeState = {
  theme: "dark",
  loading: false,
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
  },
});

export const { setLoading, setTheme } = tictactoeSlice.actions;

export default tictactoeSlice.reducer;
