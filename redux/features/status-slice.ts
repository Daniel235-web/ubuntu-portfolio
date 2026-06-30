import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StatusState {
  soundLevel: number;
  brightnessLevel: number;
  isLocked: boolean;
}

const initialState = {
  soundLevel: 50,
  brightnessLevel: 100,
  isLocked: true,
} as StatusState;

export const status = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setSoundLevel: (state, action: PayloadAction<number>) => {
      state.soundLevel = action.payload;
    },

    setBrightnessLevel: (state, action: PayloadAction<number>) => {
      state.brightnessLevel = action.payload;
    },

    lockScreen: (state) => {
      state.isLocked = true;
    },

    unlockScreen: (state) => {
      state.isLocked = false;
    },
  },
});

export const { setBrightnessLevel, setSoundLevel, lockScreen, unlockScreen } =
  status.actions;
export default status.reducer;
