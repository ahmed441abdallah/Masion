import api from "@/services/api";
import {
  ADD_TO_CART_START, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAILURE,
  GET_CART_START, GET_CART_SUCCESS, GET_CART_FAILURE,
  REMOVE_FROM_CART_START, REMOVE_FROM_CART_FAILURE, REMOVE_FROM_CART_SUCCESS,
  UPDATE_CART_ITEM_START, UPDATE_CART_ITEM_SUCCESS, UPDATE_CART_ITEM_FAILURE,
  CLEAR_CART_START,
  CLEAR_CART_SUCCESS,
  CLEAR_CART_FAILURE,
  APPLY_CUPON_START,
  APPLY_CUPON_SUCCESS,
  APPLY_CUPON_FAILURE,
} from "../types";
const AddToCart= (productId,body) => {
    return async (dispatch) => {
        dispatch({ type: ADD_TO_CART_START });
        try {
            const response = await  api.post(`cart/${productId}`,body)
            dispatch({ type: ADD_TO_CART_SUCCESS, payload: response.data.data.cart });
            return true;
            
        } catch (error) {
             const apiErrors = error.response?.data?.errors;
            const message =
              apiErrors?.[0]?.msg ?? error.response?.data?.message ?? error.message;
            dispatch({ type: ADD_TO_CART_FAILURE, payload: message });
            return message;
        }

    }
}
const getUserCart = () => {
    return async (dispatch) => {
        dispatch({ type: GET_CART_START });
        try {
            const response = await  api.get(`cart`)
            dispatch({ type: GET_CART_SUCCESS, payload: response.data.data.cart });
            return true;
            
        } catch (error) {
             const apiErrors = error.response?.data?.errors;
            const message =
              apiErrors?.[0]?.msg ?? error.response?.data?.message ?? error.message;
            dispatch({ type: GET_CART_FAILURE, payload: message });
            return message;
        }

    }
}
const RemoveFromCart = (itemId) => {
    return async (dispatch) => {
        dispatch({ type: REMOVE_FROM_CART_START });
        try {
            const response = await  api.delete(`cart/${itemId}`)
            dispatch({ type: REMOVE_FROM_CART_SUCCESS, payload: itemId });
            return true;
            
        } catch (error) {
             const apiErrors = error.response?.data?.errors;
            const message =
              apiErrors?.[0]?.msg ?? error.response?.data?.message ?? error.message;
            dispatch({ type: REMOVE_FROM_CART_FAILURE, payload: message });
            return message;
        }

    }
}   
const updateCartItem = (itemId, quantity) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_CART_ITEM_START });
        try {
            const response = await api.put(`cart/${itemId}`, { quantity });
            dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: response.data.data.cart });
            return true;
        } catch (error) {
            const apiErrors = error.response?.data?.errors;
            const message =
              apiErrors?.[0]?.msg ?? error.response?.data?.message ?? error.message;
            dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: message });
            return message;
        }
    };
};

const clearCart = () => {
    return async (dispatch) => {
        dispatch({ type: CLEAR_CART_START });
        try {
            const response = await api.delete("cart");
            dispatch({ type: CLEAR_CART_SUCCESS });
            return true;
        } catch (error) {
            const apiErrors = error.response?.data?.errors;
            const message =
              apiErrors?.[0]?.msg ?? error.response?.data?.message ?? error.message;
            dispatch({ type: CLEAR_CART_FAILURE, payload: message });
            return message;
        }
    };
};
const applyCoupon = (couponCode) => {
    return async (dispatch) => {
        dispatch({ type: APPLY_CUPON_START });
        try {
            const response = await api.put("cart/apply-coupon", { coupon: couponCode });
            dispatch({ type: APPLY_CUPON_SUCCESS, payload: response.data });
            return response.data.discount; // return the discount value to the component instead of true
        } catch (error) {
            const apiErrors = error.response?.data?.errors;
            const message =
              apiErrors?.[0]?.msg ?? error.response?.data?.message ?? error.message;
            dispatch({ type: APPLY_CUPON_FAILURE, payload: message });
            return message;
        }
    };
};
export { AddToCart, getUserCart, RemoveFromCart, updateCartItem,clearCart,applyCoupon };