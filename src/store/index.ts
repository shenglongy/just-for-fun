import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import systemReducer from "./system/systemSlice";

export const store = configureStore({
  reducer: {
    system: systemReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;
