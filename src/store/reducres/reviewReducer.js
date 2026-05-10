import { ADD_REVIEW_FAILURE, ADD_REVIEW_START, ADD_REVIEW_SUCCESS, GET_REVIEWS_FOR_PRODUCT_FAILURE, GET_REVIEWS_FOR_PRODUCT_START, GET_REVIEWS_FOR_PRODUCT_SUCCESS } from "../types";

const initialState = {
    reviews: [],
    loading: false,
    error: null,
};

 const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        // Navigating to a new product → wipe stale reviews immediately
        case GET_REVIEWS_FOR_PRODUCT_START:
            return {
                ...state,
                loading: true,
                reviews: [],
                error: null,
            };
        case ADD_REVIEW_START:
            return {
                ...state,
                loading: true,
            };
        case GET_REVIEWS_FOR_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                reviews: action.payload,
            };
        case ADD_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                reviews: [...state.reviews, action.payload],
            };
        case GET_REVIEWS_FOR_PRODUCT_FAILURE:
        case ADD_REVIEW_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
            
        default:
            return state;
    }
};
export default reviewReducer
