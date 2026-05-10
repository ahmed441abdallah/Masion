import api from "@/services/api";
import {
  GET_ALL_CUPONS_START,
  GET_ALL_CUPONS_SUCCESS,
  GET_ALL_CUPONS_FAILURE,
  ADD_CUPON_START,
  ADD_CUPON_SUCCESS,
  ADD_CUPON_FAILURE,
  DELETE_CUPON_START,
  DELETE_CUPON_SUCCESS,
  DELETE_CUPON_FAILURE,
} from "../types";

const getAllCupons = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_CUPONS_START });
    try {
      const response = await api.get("coupons");
      dispatch({
        type: GET_ALL_CUPONS_SUCCESS,
        payload: response.data.data.coupons,
      });
      return true;
    } catch (error) {
      const apiErrors = error.response?.data?.errors;
      const message =
        apiErrors?.[0]?.msg ?? error.response?.data?.message ?? error.message;
      dispatch({ type: GET_ALL_CUPONS_FAILURE, payload: message });
      return message;
    }
  };
};

const addCoupon = (data) => {
  return async (dispatch) => {
    dispatch({ type: ADD_CUPON_START });
    try {
      const response = await api.post("coupons", data);
      dispatch({
        type: ADD_CUPON_SUCCESS,
        payload: response.data.data.coupon,
      });
      return true;
    } catch (error) {
      const apiErrors = error.response?.data?.errors;
      const message =
        apiErrors?.[0]?.msg ?? error.response?.data?.message ?? error.message;
      dispatch({ type: ADD_CUPON_FAILURE, payload: message });
      return message;
    }
  };
};

const deleteCoupon = (id) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_CUPON_START });
    try {
      await api.delete(`coupons/${id}`);
      dispatch({ type: DELETE_CUPON_SUCCESS, payload: id });
      return true;
    } catch (error) {
      const apiErrors = error.response?.data?.errors;
      const message =
        apiErrors?.[0]?.msg ?? error.response?.data?.message ?? error.message;
      dispatch({ type: DELETE_CUPON_FAILURE, payload: message });
      return message;
    }
  };
};

export { getAllCupons, addCoupon, deleteCoupon };