import api from "@/services/api";
import {
  GET_REVIEWS_FOR_PRODUCT_START,
  GET_REVIEWS_FOR_PRODUCT_SUCCESS,
  GET_REVIEWS_FOR_PRODUCT_FAILURE,
  ADD_REVIEW_START,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_FAILURE,
} from "../types";

const getReviewsForProduct = (productId) => {
  return async (dispatch) => {
    dispatch({ type: GET_REVIEWS_FOR_PRODUCT_START });
    try {
      const response = await api.get(`products/${productId}/reviews`);
      dispatch({
        type: GET_REVIEWS_FOR_PRODUCT_SUCCESS,
        payload: response.data.data.docs,
      });
      return true;
    } catch (error) {
      const apiErrors = error.response?.data?.errors;
      const message =
        apiErrors?.[0]?.msg ?? error.response?.data?.message ?? error.message;
      dispatch({ type: GET_REVIEWS_FOR_PRODUCT_FAILURE, payload: message });
      return message;
    }
  };
};

const addReview = (data) => {
  return async (dispatch) => {
    dispatch({ type: ADD_REVIEW_START });
    try {
      const response = await api.post(`reviews`, data);
      dispatch({ type: ADD_REVIEW_SUCCESS, payload: response.data.data.newDoc });
      return true;
    } catch (error) {
      const apiErrors = error.response?.data?.errors;
      const message =
        apiErrors?.[0]?.msg ?? error.response?.data?.message ?? error.message;
      dispatch({ type: ADD_REVIEW_FAILURE, payload: message });
      return message;
    }
  };
};

export { getReviewsForProduct, addReview };
