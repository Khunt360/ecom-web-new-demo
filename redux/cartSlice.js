import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "user",
  initialState: {
    cartList: [],
    count:{}
  },
  reducers: {
    updateCart: (state, action) => {
      state.cartList = action.payload;
    },
    updateCount: (state, action) => {
      state.count = action.payload;
    },
  },
});

export const {
  updateCart,
  updateCount,
} = cartSlice.actions;

export default cartSlice.reducer;
