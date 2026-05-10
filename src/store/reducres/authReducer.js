import {
  ADD_TO_WISHLIST_FAILURE,
  ADD_TO_WISHLIST_START,
  ADD_TO_WISHLIST_SUCCESS,
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
  REMOVE_FROM_WISHLIST_FAILURE,
  REMOVE_FROM_WISHLIST_START,
  REMOVE_FROM_WISHLIST_SUCCESS,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
  VERIFY_RESET_CODE_FAILURE,
  VERIFY_RESET_CODE_START,
  VERIFY_RESET_CODE_SUCCESS,
} from "../types";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  error: null,
  isLoading: false,
  forgotPassword: null,
  verifyResetCode: null,
  wishlist: [],
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_START:
    case LOGIN_START:
    case FORGOT_PASSWORD_START:
    case VERIFY_RESET_CODE_START:
    case RESET_PASSWORD_START:
    case GET_PROFILE_START:
    case GET_WISHLIST_START:
    case REMOVE_FROM_WISHLIST_START:
    case ADD_TO_WISHLIST_START:
      return { ...state, error: null, isLoading: true };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.data.user,
        token: action.payload.token,
        error: null,
        isLoading: false,
      };
    case REMOVE_FROM_WISHLIST_SUCCESS:
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (item) => item._id !== action.payload.id
        ),
        isLoading: false,
        error: null,
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload.data.user,
        isLoading: false,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        forgotPassword: action.payload,
      };

    case VERIFY_RESET_CODE_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        verifyResetCode: action.payload,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        resetPassword: action.payload,
      };
    case GET_WISHLIST_SUCCESS:
      return {
        ...state,
        wishlist: action.payload,
        isLoading: false,
        error: null,
      };

    case ADD_TO_WISHLIST_SUCCESS:
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
        isLoading: false,
        error: null,
      };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case FORGOT_PASSWORD_FAILURE:
    case VERIFY_RESET_CODE_FAILURE:
    case RESET_PASSWORD_FAILURE:
    case GET_PROFILE_FAILURE:
    case GET_WISHLIST_FAILURE:
    case REMOVE_FROM_WISHLIST_FAILURE:
    case ADD_TO_WISHLIST_FAILURE:
      return { ...state, error: action.payload, isLoading: false };

    case LOGOUT:
      return {
        user: null,
        token: null,
        error: null,
        isLoading: false,
        forgotPassword: null,
        verifyResetCode: null,
        wishlist: [],
      };

    default:
      return state;
  }
};

export default authReducer;
