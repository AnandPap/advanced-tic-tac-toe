import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface InitialState {
  darkMode: boolean;
  additionalDarkModeClass: boolean;
  playAs: string;
}

const initialState: InitialState = {
  darkMode: true,
  additionalDarkModeClass: false,
  playAs: "Random",
};

export const tictactoeSlice = createSlice({
  name: "tictactoe",
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    setAdditionalDarkModeClass: (state, action: PayloadAction<boolean>) => {
      state.additionalDarkModeClass = action.payload;
    },
    setPlayAs: (state, action: PayloadAction<string>) => {
      state.playAs = action.payload;
    },
  },
});

export const { setDarkMode, setAdditionalDarkModeClass, setPlayAs } =
  tictactoeSlice.actions;

export default tictactoeSlice.reducer;
