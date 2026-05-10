import api from "@/services/api";
import {
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_SUCCESS,
  GET_PROFILE_FAILURE,
  GET_PROFILE_START,
  GET_PROFILE_SUCCESS,
  GET_WISHLIST_FAILURE,
  GET_WISHLIST_START,
  GET_WISHLIST_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_START,
  REGISTER_SUCCESS,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
  VERIFY_RESET_CODE_FAILURE,
  VERIFY_RESET_CODE_START,
  VERIFY_RESET_CODE_SUCCESS,
} from "../types";

const register = (name, email, password) => {
  return async (dispatch) => {
    dispatch({ type: REGISTER_START });
    try {
      const response = await api.post("users/register", {
        name,
        email,
        password,
      });
      dispatch({ type: REGISTER_SUCCESS, payload: response.data });
      const token = response.data?.data?.token ?? response.data?.token;
      if (token) localStorage.setItem("token", token);
      return true;
    } catch (error) {
      const apiErrors = error.response?.data?.errors;
      const message =
        apiErrors?.[0]?.msg ?? error.response?.data?.message ?? error.message;
      dispatch({ type: REGISTER_FAILURE, payload: message });
      return message;
    }
  };
};
const login = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_START });
    try {
      const response = await api.post("users/login", {
        email,
        password,
      });
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      const token = response.data?.data?.token ?? response.data?.token;
      if (token) localStorage.setItem("token", token);
      return true;
    } catch (error) {
      const apiErrors = error.response?.data?.errors;
      const message =
        apiErrors?.[0]?.msg ?? error.response?.data?.message ?? error.message;
      dispatch({ type: LOGIN_FAILURE, payload: message });
      return message;
    }
  };
};
const getUserProfile = () => {
  return async (dispatch) => {
    dispatch({ type: GET_PROFILE_START });
    try {
      const response = await api.get("users/profile");
      dispatch({ type: GET_PROFILE_SUCCESS, payload: response.data });
    } catch (error) {
      const apiErrors = error.response?.data?.errors;
      const message =
        apiErrors?.[0]?.msg ?? error.response?.data?.message ?? error.message;
      dispatch({ type: GET_PROFILE_FAILURE, payload: message });
      return message;
    }
  };
};
const forgotPassword = (email) => {
  return async (dispatch) => {
    dispatch({ type: FORGOT_PASSWORD_START });
    try {
      const response = await api.post("users/forgot-password", { email });
      dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: response.data });
      return true;
    } catch (error) {
      const apiErrors = error.response?.data?.errors;
      const message =
        apiErrors?.[0]?.msg ?? error.response?.data?.message ?? error.message;
      dispatch({ type: FORGOT_PASSWORD_FAILURE, payload: message });
      return message;
    }
  };
};

const verfiyResetCode = (resetCode) => {
  return async (dispatch) => {
    dispatch({ type: VERIFY_RESET_CODE_START });
    try {
      const response = await api.post("users/verify-reset-code", { resetCode });
      dispatch({ type: VERIFY_RESET_CODE_SUCCESS, payload: response.data });
      return true;
    } catch (error) {
      const apiErrors = error.response?.data?.errors;
      const message =
        apiErrors?.[0]?.msg ?? error.response?.data?.message ?? error.message;
      dispatch({ type: VERIFY_RESET_CODE_FAILURE, payload: message });
      return message;
    }
  };
};
const resetPassword = (data) => {
  return async (dispatch) => {
    dispatch({ type: RESET_PASSWORD_START });
    try {
      const response = await api.put("users/reset-password", data);
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: response.data });
      return true;
    } catch (error) {
      const apiErrors = error.response?.data?.errors;
      const message =
        apiErrors?.[0]?.msg ?? error.response?.data?.message ?? error.message;
      dispatch({ type: RESET_PASSWORD_FAILURE, payload: message });
      return message;
    }
  };
};
const getUserWishlist = () => {
  return async (dispatch) => {
    dispatch({ type: GET_WISHLIST_START });
    try {
      const response = await api.get("wishlist");
      dispatch({
        type: GET_WISHLIST_SUCCESS,
        payload: response.data.data.wishlist,
      });
      return true;
    } catch (error) {
      const apiErrors = error.response?.data?.errors;
      const message =
        apiErrors?.[0]?.msg ?? error.response?.data?.message ?? error.message;
      dispatch({ type: GET_WISHLIST_FAILURE, payload: message });
      return message;
    }
  };
};
const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT });
};

export {
  register,
  login,
  logout,
  getUserProfile,
  forgotPassword,
  verfiyResetCode,
  verfiyResetCode as verifyResetCode,
  resetPassword,
  getUserWishlist,
};
