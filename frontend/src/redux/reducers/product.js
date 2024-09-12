import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  success: false,
  error: null,
  product: null,
  products: null,
  allProducts: null,
  message: null,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    // creating product
    .addCase("ProductCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("ProductCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.success = true;
    })
    .addCase("ProductCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })

    // get all products of shop
    .addCase("GetAllProductsShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("GetAllProductsShopSuccess", (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.success = true;
    })
    .addCase("GetAllProductsShopFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })

    // delete product of a shop
    .addCase("DeleteProductRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("DeleteProductSuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.success = true;
    })
    .addCase("DeleteProductFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })

    // get all products
    .addCase("GetAllProductsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("GetAllProductsSuccess", (state, action) => {
      state.isLoading = false;
      state.allProducts = action.payload;
    })
    .addCase("GetAllProductsFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })


    .addCase("clearErrors", (state) => {
      state.error = null;
    });



});

export default productReducer;
