import {
  ADD_CUPON_FAILURE,
  ADD_CUPON_START,
  ADD_CUPON_SUCCESS,
  DELETE_CUPON_FAILURE,
  DELETE_CUPON_START,
  DELETE_CUPON_SUCCESS,
  GET_ALL_CUPONS_FAILURE,
  GET_ALL_CUPONS_START,
  GET_ALL_CUPONS_SUCCESS,
} from "../types";

const initialState = {
  cupons: [],
  loading: false,
  error: null,
};

export const cuponReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CUPONS_START:
    case ADD_CUPON_START:
    case DELETE_CUPON_START:
      return { ...state, loading: true, error: null };

    case GET_ALL_CUPONS_SUCCESS:
      return { ...state, loading: false, cupons: action.payload };

    case ADD_CUPON_SUCCESS:
      return {
        ...state,
        loading: false,
        cupons: [...state.cupons, action.payload],
      };

    case DELETE_CUPON_SUCCESS:
      return {
        ...state,
        loading: false,
        cupons: state.cupons.filter((c) => c._id !== action.payload),
      };

    case GET_ALL_CUPONS_FAILURE:
    case ADD_CUPON_FAILURE:
    case DELETE_CUPON_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};