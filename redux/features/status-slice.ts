import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StatusState {
  soundLevel: number;
  brightnessLevel: number;
  isLocked: boolean;
  showAppsDrawer: boolean;
}

const initialState = {
  soundLevel: 50,
  brightnessLevel: 100,
  isLocked: true,
  showAppsDrawer: false,
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

    toggleAppsDrawer: (state) => {
      state.showAppsDrawer = !state.showAppsDrawer;
    },

    openAppsDrawer: (state) => {
      state.showAppsDrawer = true;
    },

    closeAppsDrawer: (state) => {
      state.showAppsDrawer = false;
    },
  },
});

export const {
  setBrightnessLevel,
  setSoundLevel,
  lockScreen,
  unlockScreen,
  toggleAppsDrawer,
  openAppsDrawer,
  closeAppsDrawer,
} = status.actions;
export default status.reducer;
