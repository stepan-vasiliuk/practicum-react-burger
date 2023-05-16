import {
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
    MODAL_CLOSE,
    MODAL_OPEN, ORDER_MODAL_DATA_LOADING_OFF,
    ORDER_MODAL_DATA_LOADING_ON
} from "../actionTypes";
import {TConstructorActions} from "../actions/constructorActions";
import {TOrderActions} from "../actions/orderActions";

const initialState = {
    isOpen: false,
    orderNumber: 0,
    hasError: false,
    isLoading: false,
}

export const orderReducer = (state = initialState, action: TOrderActions) => {
    switch (action.type) {
        case MODAL_CLOSE:
            return {
                ...state,
                isOpen: false,
                isLoading: false,
                hasError: false,
            }
        case MODAL_OPEN:
            return {
                ...state,
                isOpen: true,
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