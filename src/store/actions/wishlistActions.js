import api from "@/services/api";
import { ADD_TO_WISHLIST_FAILURE, ADD_TO_WISHLIST_START, ADD_TO_WISHLIST_SUCCESS, REMOVE_FROM_WISHLIST_FAILURE, REMOVE_FROM_WISHLIST_START, REMOVE_FROM_WISHLIST_SUCCESS } from "../types";
const removeFromWishlist=(productId)=>{
    return async (dispatch)=> {
        dispatch({type:REMOVE_FROM_WISHLIST_START})
        try {
            const response = await api.delete(`wishlist/${productId}`)
            dispatch({type:REMOVE_FROM_WISHLIST_SUCCESS,payload:productId})
            return true;
        } catch (error) {
            const apiErrors = error.response?.data?.errors;
            const message =
              apiErrors?.[0]?.msg ?? error.response?.data?.message ?? error.message;
            dispatch({ type: REMOVE_FROM_WISHLIST_FAILURE, payload: message });
            return message;
        }

    }
}
const addToWishlist= (productId) => {
    return async(dispatch) =>{
        dispatch({type:ADD_TO_WISHLIST_START})
        try {
            const response = await api.post('wishlist',{productId})
            dispatch({type:ADD_TO_WISHLIST_SUCCESS,payload:response.data.data.wishlist})
            return true;
            
        } catch (error) {
            const apiErrors = error.response?.data?.errors;
            const message =
              apiErrors?.[0]?.msg ?? error.response?.data?.message ?? error.message;
            dispatch({ type: ADD_TO_WISHLIST_FAILURE, payload: message });
            return message;
        } 
        
    }
}
export {
    removeFromWishlist,
    addToWishlist
}