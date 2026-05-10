// store/reducers/orderReducer.js
import { 
  CREATE_ORDER_START, 
  CREATE_ORDER_SUCCESS, 
  CREATE_ORDER_FAILURE, 
  GET_USER_ORDERS_START,
  GET_USER_ORDERS_SUCCESS,
  GET_USER_ORDERS_FAILURE,
  UPDATE_ORDER_START,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAILURE
} from "../types";

const initialState = {
    order: null,
    orders: [],
    isLoading: false,
    error: null,
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_START:
            return { ...state, isLoading: true, error: null };
            
        case CREATE_ORDER_SUCCESS:
            return { 
                ...state, 
                isLoading: false, 
                order: action.payload 
            };
            
        case CREATE_ORDER_FAILURE:
            return { ...state, isLoading: false, error: action.payload };
        case GET_USER_ORDERS_START:
            return { ...state, isLoading: true, error: null };
        case GET_USER_ORDERS_SUCCESS:
            return { ...state, isLoading: false, orders: action.payload, error: null };
        case GET_USER_ORDERS_FAILURE:
            return { ...state, isLoading: false, orders: [], error: action.payload };   
        case UPDATE_ORDER_START:
            return { ...state, isLoading: true, error: null };
        case UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                orders: state.orders.map(order => 
                    order._id === action.payload._id ? action.payload : order
                ),
                error: null
            };
        case UPDATE_ORDER_FAILURE:
            return { ...state, isLoading: false, error: action.payload };
        default:
            return state;
    }
};

export default orderReducer;