// reducers/wishlist.js
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  wishlist: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [],
};

const wishlistReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("ADD_TO_WISHLIST", (state, action) => {
      const item = action.payload;
      const isItemExists = state.wishlist.find((i) => i._id === item._id);
      if (!isItemExists) {
        state.wishlist.push(item);
      }
    })
    .addCase("REMOVE_FROM_WISHLIST", (state, action) => {
      state.wishlist = state.wishlist.filter((item) => item._id !== action.payload);
    });
});

export default wishlistReducer;
