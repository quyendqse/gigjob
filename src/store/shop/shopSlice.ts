import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { shop } from "../../mockData/shopProfile";
import Shop from "../../model/Shop";

const initialState: Shop = shop;

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<Shop>) => {
      state = action.payload;
    },
  },
});

export default shopSlice.reducer;

export const selectShop = (state: RootState) => state.shop;

export const { update } = shopSlice.actions;
