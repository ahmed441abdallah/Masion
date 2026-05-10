import {
  ADD_CATEGORY_FAILURE,
  ADD_CATEGORY_START,
  ADD_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE,
  DELETE_CATEGORY_START,
  DELETE_CATEGORY_SUCCESS,
  GET_CATEGORIES,
} from "../types";

const initialState = {
  categories: [],
  isLoading: false,
  error: null,
  lastFetched: null,
};
export const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        isLoading: false,
        error: null,
        lastFetched: Date.now(),
      };
    case ADD_CATEGORY_START:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: action.payload
          ? [...state.categories, action.payload]
          : state.categories,
        isLoading: false,
        error: null,
      };
    case ADD_CATEGORY_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case DELETE_CATEGORY_START:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category._id !== action.payload,
        ),
        isLoading: false,
        error: null,
      };
    case DELETE_CATEGORY_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
