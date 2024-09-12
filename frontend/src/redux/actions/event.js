import axios from "axios";
import { server } from "../../server";

// Create event
export const createEvent = (newForm) => async (dispatch) => {
  try {
    dispatch({ type: "EventCreateRequest" });

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(`${server}/event/create-event`, newForm, config);

    dispatch({ type: "EventCreateSuccess", payload: data.event });
  } catch (error) {
    dispatch({ type: "EventCreateFail", payload: error.response.data.message });
  }
};

// Get all events of a shop
export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch({ type: "GetAllEventsShopRequest" });

    const { data } = await axios.get(`${server}/event/get-all-events-shop/${id}`);
    dispatch({ type: "GetAllEventsShopSuccess", payload: data.events });
  } catch (error) {
    dispatch({ type: "GetAllEventsShopFailed", payload: error.response.data.message });
  }
};

// Delete event of a shop
export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DeleteEventRequest" });

    const { data } = await axios.delete(`${server}/event/delete-shop-event/${id}`, { withCredentials: true });
    dispatch({ type: "DeleteEventSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "DeleteEventFailed", payload: error.response.data.message });
  }
};

// Get all events
export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({ type: "GetAllEventsRequest" });

    const { data } = await axios.get(`${server}/event/get-all-events`);
    dispatch({ type: "GetAllEventsSuccess", payload: data.events });
  } catch (error) {
    dispatch({ type: "GetAllEventsFailed", payload: error.response.data.message });
  }
};

// Clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "clearErrors" });
};
