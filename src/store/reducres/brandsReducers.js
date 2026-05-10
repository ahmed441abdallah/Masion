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

const initialState = {
  brands: [],
  isLoading: false,
  error: null,
  lastFetched: null,
};
const brandsReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BRANDS_START:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ALL_BRANDS_SUCCESS:
      return {
        ...state,
        brands: action.payload,
        isLoading: false,
        error: null,
        lastFetched: Date.now(),
      };
    case GET_ALL_BRANDS_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case ADD_BRAND_START:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case ADD_BRAND_SUCCESS:
      return {
        ...state,
        brands: action.payload
          ? [...state.brands, action.payload]
          : state.brands,
        isLoading: false,
        error: null,
      };
    case ADD_BRAND_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case DELETE_BRAND_START:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case DELETE_BRAND_SUCCESS:
      return {
        ...state,
        brands: state.brands.filter((brand) => brand._id !== action.payload),
        isLoading: false,
        error: null,
      };
    case DELETE_BRAND_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
export default brandsReducers;
