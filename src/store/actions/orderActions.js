import api from "@/services/api";
import { 
  CREATE_ORDER_START, 
  CREATE_ORDER_SUCCESS, 
  CREATE_ORDER_FAILURE, 
  GET_USER_ORDERS_SUCCESS,
  GET_USER_ORDERS_FAILURE,
  GET_USER_ORDERS_START,
  UPDATE_ORDER_START,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAILURE
} from "../types"; 

export const createCashOrder = (cartId, shippingAddress) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_ORDER_START });
        try {
            const response = await api.post(`orders/${cartId}`, { shippingAddress });
            
            dispatch({ type: CREATE_ORDER_SUCCESS, payload: response.data.data.order });
            
            return true; // بنرجع true عشان الكومبوننت يعرف إنها نجحت
        } catch (error) {
            const apiErrors = error.response?.data?.errors;
            const message = apiErrors?.[0]?.msg ?? error.response?.data?.message ?? error.message;
            
            dispatch({ type: CREATE_ORDER_FAILURE, payload: message });
            return message; // بنرجع رسالة الخطأ
        }
    };
};

export const createCardOrder = (cartId, shippingAddress) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_ORDER_START });
        try {
            const response = await api.get(`orders/create-checkout-session/${cartId}`, { shippingAddress });
            const sessionUrl = response.data?.data?.session?.url;
            return { success: true, url: sessionUrl };
        } catch (error) {
            const apiErrors = error.response?.data?.errors;
            const message = apiErrors?.[0]?.msg ?? error.response?.data?.message ?? error.message;
            dispatch({ type: CREATE_ORDER_FAILURE, payload: message });
            return { success: false, message };
        }
    };
};

export const getUserOrders = () => {
    return async (dispatch) => {
        dispatch({ type: GET_USER_ORDERS_START });
        try {
            const response = await api.get("orders");
            dispatch({ type: GET_USER_ORDERS_SUCCESS, payload: response.data.data.orders });
            return true;
        } catch (error) {
            const apiErrors = error.response?.data?.errors;
            const message = apiErrors?.[0]?.msg ?? error.response?.data?.message ?? error.message;
            dispatch({ type: GET_USER_ORDERS_FAILURE, payload: message });
            return message;
        }
    };
};

export const updateOrderStatus = (orderId, updateData) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_ORDER_START });
        try {
            const response = await api.put(`orders/${orderId}`, updateData);
            dispatch({ type: UPDATE_ORDER_SUCCESS, payload: response.data.data?.order || response.data?.order });
            return true;
        } catch (error) {
            const apiErrors = error.response?.data?.errors;
            const message = apiErrors?.[0]?.msg ?? error.response?.data?.message ?? error.message;
            dispatch({ type: UPDATE_ORDER_FAILURE, payload: message });
            return message;
        }
    };
};
