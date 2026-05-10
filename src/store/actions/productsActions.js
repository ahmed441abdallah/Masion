import api from "@/services/api";
import {
  ADD_PRODUCT_FAILURE,
  ADD_PRODUCT_START,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_START,
  DELETE_PRODUCT_SUCCESS,
  GET_ALL_PRODUCTS_FAILURE,
  GET_ALL_PRODUCTS_START,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_PRODUCT_DETAILS_FAILURE,
  GET_PRODUCT_DETAILS_START,
  GET_PRODUCT_DETAILS_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_START,
  UPDATE_PRODUCT_SUCCESS,
} from "../types";

const getAllProducts = (filters = {}) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_PRODUCTS_START });
    try {
      const params = {};
      if (filters.priceGte) params["price[gte]"] = filters.priceGte;
      if (filters.priceLte) params["price[lte]"] = filters.priceLte;
      if (filters.sort) params.sort = filters.sort;
      if (filters.search) params.keyword = filters.search;
      if (filters.category) params.category = filters.category;
      if (filters.page) params.page = filters.page;
      if (filters.limit) params.limit = filters.limit;
      const endPoint = params.category
        ? `categories/${params.category}/products`
        : "products";
      const response = await api.get(endPoint, { params });
      dispatch({
        type: GET_ALL_PRODUCTS_SUCCESS,
        payload: response.data.data.products,
        totalProducts: response.data.totalItems,
      });
      return true;
    } catch (error) {
      dispatch({ type: GET_ALL_PRODUCTS_FAILURE, payload: error.message });
      return error.message;
    }
  };
};

const addProduct = (formData) => {
  return async (dispatch) => {
    dispatch({ type: ADD_PRODUCT_START });
    try {
      const response = await api.post("products", formData);
      dispatch({
        type: ADD_PRODUCT_SUCCESS,
        payload: response.data.data.newDoc ?? response.data.data,
      });
      return true;
    } catch (error) {
      const serverMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.msg ||
        error.response?.data?.error ||
        error.message;
      dispatch({ type: ADD_PRODUCT_FAILURE, payload: serverMessage });
      return serverMessage;
    }
  };
};
const deleteProduct = (productId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_PRODUCT_START });
    try {
      const response = await api.delete(`products/${productId}`);
      dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: productId });
      return true;
    } catch (error) {
      const serverMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.msg ||
        error.response?.data?.error ||
        error.message;
      dispatch({ type: DELETE_PRODUCT_FAILURE, payload: serverMessage });
      return serverMessage;
    }
  };
};
const getProductDetails = (productId) => {
  return async (dispatch) => {
    dispatch({ type: GET_PRODUCT_DETAILS_START });
    try {
      const response = await api.get(`products/${productId}`);
      dispatch({
        type: GET_PRODUCT_DETAILS_SUCCESS,
        payload: response.data.data,
      });
      return true;
    } catch (error) {
      dispatch({ type: GET_PRODUCT_DETAILS_FAILURE, payload: error.message });
      return error.message;
    }
  };
};
const updateProduct = (productId, payload) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_PRODUCT_START });
    try {
      const isFormData = payload instanceof FormData;
      const response = await api.put(
        `products/${productId}`,
        payload,
        isFormData ? {} : { headers: { "Content-Type": "application/json" } },
      );
      dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: response.data.data });
      return true;
    } catch (error) {
      const serverMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.msg ||
        error.response?.data?.error ||
        error.message;
      console.error(
        "[updateProduct] server error:",
        error.response?.data ?? error.message,
      );
      dispatch({ type: UPDATE_PRODUCT_FAILURE, payload: serverMessage });
      return serverMessage;
    }
  };
};

export {
  getAllProducts,
  addProduct,
  deleteProduct,
  getProductDetails,
  updateProduct,
};
