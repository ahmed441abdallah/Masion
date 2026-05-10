import api from "@/services/api";
import {
  ADD_CATEGORY_FAILURE,
  ADD_CATEGORY_START,
  ADD_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE,
  DELETE_CATEGORY_START,
  DELETE_CATEGORY_SUCCESS,
  GET_CATEGORIES,
  GET_ERROR,
} from "../types";

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const getAllCategories = () => {
  return async (dispatch, getState) => {
    const { lastFetched, categories } = getState().categories;
    if (lastFetched && categories.length > 0 && Date.now() - lastFetched < CACHE_TTL) {
      return true; // data is fresh, skip fetch
    }
    try {
      const response = await api.get("categories");
      dispatch({
        type: GET_CATEGORIES,
        payload: response.data.data.categories,
      });
    } catch (error) {
      dispatch({ type: GET_ERROR, payload: error.message });
    }
  };
};

const addCategory = (formData) => {
  return async (dispatch) => {
    dispatch({ type: ADD_CATEGORY_START });
    try {
      const response = await api.post("categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch({
        type: ADD_CATEGORY_SUCCESS,
        payload: response.data.data.newDoc,
      });
      return true;
    } catch (error) {
      const apiErrors = error.response?.data?.errors;
      const message =
        apiErrors?.[0]?.msg ?? error.response?.data?.message ?? error.message;
      dispatch({ type: ADD_CATEGORY_FAILURE, payload: message });
      return message;
    }
  };
};
const deleteCategory = (id) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_CATEGORY_START });
    try {
      const response = await api.delete(`categories/${id}`);
      dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: id });
      return true;
    } catch (error) {
      const apiErrors = error.response?.data?.errors;
      const message =
        apiErrors?.[0]?.msg ?? error.response?.data?.message ?? error.message;
      dispatch({ type: DELETE_CATEGORY_FAILURE, payload: message });
      return message;
    }
  };
};
export { getAllCategories, addCategory, deleteCategory };
