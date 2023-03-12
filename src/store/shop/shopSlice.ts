import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ShopResponse } from "../../api/response/ShopResponse";
import { shop } from "../../mockData/shopProfile";
import Shop from "../../model/Shop";

const initialState: Shop = shop;

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    updateShop: (state, action: PayloadAction<ShopResponse>) => {
      state.account.id = action.payload.accountId;
      state.description = action.payload.description;
      state.id = action.payload.id;
      state.name = action.payload.name;
      console.log(`dispatch saved: ` + JSON.stringify(state));
    },
  },
});

export default shopSlice.reducer;

export const selectShop = (state: RootState) => state.shop;

export const { updateShop } = shopSlice.actions;
