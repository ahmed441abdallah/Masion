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
  GET_PRODUCTS_BY_CATEGORY_FAILURE,
  GET_PRODUCTS_BY_CATEGORY_START,
  GET_PRODUCTS_BY_CATEGORY_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_START,
  UPDATE_PRODUCT_SUCCESS,
} from "../types";

const initialState = {
  products: [],
  product: null,
  isLoading: false,
  error: null,
  totalProducts: 0,
};
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    // ══════════════════════════════════════════
    // (START )
    // ══════════════════════════════════════════
    case GET_ALL_PRODUCTS_START:
    case GET_PRODUCT_DETAILS_START:
    case UPDATE_PRODUCT_START:
    case DELETE_PRODUCT_START:
    case ADD_PRODUCT_START:
    case GET_PRODUCTS_BY_CATEGORY_START:
      return {
        ...state,
        isLoading: true,
      };
    // ══════════════════════════════════════════
    // (SUCCESS )
    // ══════════════════════════════════════════
    case GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        isLoading: false,
        error: null,
        totalProducts: action.totalProducts,
      };

    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        products: [...state.products, action.payload],
        isLoading: false,
        error: null,
        totalProducts: state.totalProducts + 1,
      };

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter((p) => p._id !== action.payload),
        isLoading: false,
        error: null,
        totalProducts: state.totalProducts - 1,
      };

    case GET_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        product: action.payload,
        isLoading: false,
        error: null,
      };

    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        product: action.payload,
        products: state.products.map((p) =>
          p._id === action.payload._id ? action.payload : p,
        ),
      };
    // ══════════════════════════════════════════
    // (FAILURE )
    // ══════════════════════════════════════════
    case GET_ALL_PRODUCTS_FAILURE:
    case UPDATE_PRODUCT_FAILURE:
    case GET_PRODUCT_DETAILS_FAILURE:
    case DELETE_PRODUCT_FAILURE:
    case ADD_PRODUCT_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
export default productReducer;
