import api from "@/services/api";
import {
  ADD_BRAND_FAILURE,
  ADD_BRAND_START,
  ADD_BRAND_SUCCESS,
  DELETE_BRAND_FAILURE,
  DELETE_BRAND_START,
  DELETE_BRAND_SUCCESS,
  GET_ALL_BRANDS_FAILURE,
  GET_ALL_BRANDS_START,
  GET_ALL_BRANDS_SUCCESS,
} from "../types";

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const getAllBrands = () => {
  return async (dispatch, getState) => {
    const { lastFetched, brands } = getState().brands;
    if (lastFetched && brands.length > 0 && Date.now() - lastFetched < CACHE_TTL) {
      return true; // data is fresh, skip fetch
    }
    dispatch({ type: GET_ALL_BRANDS_START });
    try {
      const response = await api.get("brands");
      dispatch({
        type: GET_ALL_BRANDS_SUCCESS,
        payload: response.data.data.brands,
      });
      return true;
    } catch (error) {
      dispatch({ type: GET_ALL_BRANDS_FAILURE, payload: error.message });
      return error.message;
    }
  };
};
const addBrand = (formData) => {
  return async (dispatch) => {
    dispatch({ type: ADD_BRAND_START });
    try {
      const response = await api.post("brands", formData);
      dispatch({ type: ADD_BRAND_SUCCESS, payload: response.data.data.newDoc });
      return true;
    } catch (error) {
      const apiErrors = error.response?.data?.errors;
      const message =
        apiErrors?.[0]?.msg ?? error.response?.data?.message ?? error.message;
      dispatch({ type: ADD_BRAND_FAILURE, payload: error.message });
      return error.message;
    }
  };
};
const deleteBrand = (id) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_BRAND_START });
    try {
      const response = await api.delete(`brands/${id}`);
      dispatch({ type: DELETE_BRAND_SUCCESS, payload: id });
      return true;
    } catch (error) {
      const apiErrors = error.response?.data?.errors;
      const message =
        apiErrors?.[0]?.msg ?? error.response?.data?.message ?? error.message;
      dispatch({ type: DELETE_BRAND_FAILURE, payload: message });
      return message;
    }
  };
};
export { getAllBrands, addBrand, deleteBrand };
