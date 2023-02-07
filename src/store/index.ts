import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import tagReducer from "./tag/tagSlice";

export const store = configureStore({
  reducer: {
    tag: tagReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
