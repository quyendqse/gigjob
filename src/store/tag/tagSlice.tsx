import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

const initialState: Array<string> = [];

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      state = [...state, action.payload];
    },
  },
});

export default tagSlice.reducer;

export const selectTag = (state: RootState) => state.tag;

export const { add } = tagSlice.actions;
