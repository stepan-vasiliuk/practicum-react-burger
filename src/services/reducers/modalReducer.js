import {
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
    MODAL_CLOSE,
    MODAL_OPEN, ORDER_MODAL_DATA_LOADING_OFF,
    ORDER_MODAL_DATA_LOADING_ON
} from "../actionTypes";

const initialState = {
    isOpen: false,
    ingredient: null,
    orderNumber: 0,
    hasError: false,
    isLoading: false,
}

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case MODAL_CLOSE:
            return {
                ...state,
                isOpen: false,
                ingredient: null,
                isLoading: false,
                hasError: false,
            }
        case MODAL_OPEN:
            return {
                ...state,
                isOpen: true,
                ingredient: action.data,
            }
        case GET_ORDER_SUCCESS:
            return {
                ...state,
                orderNumber: action.data
            }
        case GET_ORDER_FAILED:
            return {
                ...state,
                hasError: true
            }
        case ORDER_MODAL_DATA_LOADING_ON:
            return {
                ...state,
                isLoading: true,
            }
        case ORDER_MODAL_DATA_LOADING_OFF:
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state;
    }
}