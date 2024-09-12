import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  success: false,
  error: null,
  event: null,
  events: null,
  allevents: null,
  message: null,
};

export const eventReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("EventCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("EventCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.event = action.payload;
      state.success = true;
    })
    .addCase("EventCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("GetAllEventsShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("GetAllEventsShopSuccess", (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
      state.success = true;
    })
    .addCase("GetAllEventsShopFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("DeleteEventRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("DeleteEventSuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.success = true;
    })
    .addCase("DeleteEventFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("GetAllEventsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("GetAllEventsSuccess", (state, action) => {
      state.isLoading = false;
      state.allevents = action.payload;
    })
    .addCase("GetAllEventsFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});

export default eventReducer;
