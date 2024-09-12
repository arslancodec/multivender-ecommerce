import axios from "axios";
import { server } from "../../server";

// create product
export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch({ type: "ProductCreateRequest" });

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(`${server}/product/create-product`, newForm, config);
    
    dispatch({ type: "ProductCreateSuccess", payload: data.product });
  } catch (error) {
    dispatch({ type: "ProductCreateFail", payload: error.response.data.message });
  }
};

// get all products of shop
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({ type: "GetAllProductsShopRequest" });

    const { data } = await axios.get(`${server}/product/get-all-products-shop/${id}`);

    dispatch({ type: "GetAllProductsShopSuccess", payload: data.products });
  } catch (error) {
    dispatch({ type: "GetAllProductsShopFailed", payload: error.response.data.message });
  }
};

// delete product of a shop
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DeleteProductRequest" });

    const { data } = await axios.delete(`${server}/product/delete-shop-product/${id}`, { withCredentials: true });

    dispatch({ type: "DeleteProductSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "DeleteProductFailed", payload: error.response.data.message });
  }
};

// get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "GetAllProductsRequest" });

    const { data } = await axios.get(`${server}/product/get-all-products`);
    dispatch({ type: "GetAllProductsSuccess", payload: data.products });
  } catch (error) {
    dispatch({ type: "GetAllProductsFailed", payload: error.response.data.message });
  }
};

// clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "clearErrors" });
};
