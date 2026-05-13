import { ADD_TO_CART_FAILURE, ADD_TO_CART_START, ADD_TO_CART_SUCCESS, APPLY_CUPON_FAILURE, APPLY_CUPON_START, APPLY_CUPON_SUCCESS, CLEAR_CART_FAILURE, CLEAR_CART_START, CLEAR_CART_SUCCESS, GET_CART_FAILURE, GET_CART_START, GET_CART_SUCCESS, REMOVE_FROM_CART_FAILURE, REMOVE_FROM_CART_START, REMOVE_FROM_CART_SUCCESS, UPDATE_CART_ITEM_FAILURE, UPDATE_CART_ITEM_START, UPDATE_CART_ITEM_SUCCESS } from "../types";

const intialState = {
    cartItems: null,   // full cart object: { cartItems: [...], totalCartPrice, ... }
    isLoading: false,
    error: null,
    discount:0
}

const cartReducer = (state = intialState, action) => {
    switch (action.type) {
        case ADD_TO_CART_START:
        case GET_CART_START:
        case REMOVE_FROM_CART_START:
        case UPDATE_CART_ITEM_START:
        case CLEAR_CART_START:
        case APPLY_CUPON_START:
            return {
                ...state,
                isLoading: true,
                error: null,
            };

        case GET_CART_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                cartItems: action.payload,   // full object { cartItems: [...], totalCartPrice, ... }
            };

        case ADD_TO_CART_SUCCESS:
            // API returns the updated full cart object
            return {
                ...state,
                isLoading: false,
                error: null,
                cartItems: action.payload,
            };

        case REMOVE_FROM_CART_SUCCESS: {
            // action.payload = product._id
            const filteredItems = state.cartItems?.cartItems?.filter(
                (item) => item.product?._id !== action.payload
            ) ?? [];
            // Recalculate total from the remaining items
            const newTotal = filteredItems.reduce(
                (sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 1),
                0
            );
            return {
                ...state,
                isLoading: false,
                error: null,
                cartItems: {
                    ...state.cartItems,
                    cartItems: filteredItems,
                    totalCartPrice: newTotal,
                },
            };
        }

        case ADD_TO_CART_FAILURE:
        case REMOVE_FROM_CART_FAILURE:
        case GET_CART_FAILURE:
        case UPDATE_CART_ITEM_FAILURE:
        case CLEAR_CART_FAILURE:
        case APPLY_CUPON_FAILURE:
                
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        case UPDATE_CART_ITEM_SUCCESS:
            // API returns updated full cart object
            return {
                ...state,
                isLoading: false,
                error: null,
                cartItems: action.payload,
            };
            case CLEAR_CART_SUCCESS :
                return {
                    ...state,
                    isLoading: false,
                    error: null,
                    cartItems: null,
                };
            case APPLY_CUPON_SUCCESS: 
                return {
                    ...state,
                    isLoading: false,
                    error: null,
                    discount: action.payload.discount,
                    cartItems: action.payload.data.cart,
                };
            
                

        default:
            return state;
    }
};

export default cartReducer;