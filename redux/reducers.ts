import { combineReducers } from '@reduxjs/toolkit';

import statusSlice from '@/redux/features/status-slice';
import backgroundImage from '@/redux/features/background-image-slice';
import allApps from '@/redux/features/all-apps-slice';
import fileSystemReducer from '@/redux/features/file-system-slice';

const rootReducer = combineReducers({
  status: statusSlice,
  backgroundImage: backgroundImage,
  allApps: allApps,
  fileSystem: fileSystemReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
