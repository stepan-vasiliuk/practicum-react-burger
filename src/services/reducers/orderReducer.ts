import {
    GET_CURRENT_ORDER_INFO,
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
    MODAL_CLOSE,
    MODAL_OPEN,
    ORDER_MODAL_DATA_LOADING_OFF,
    ORDER_MODAL_DATA_LOADING_ON
} from "../actionTypes";

import {TOrderActions} from "../actions/orderActions";
import {TFeedDetailedOrder, TProfileDetailedOrder} from "../../utils/types";

type TOrderInitial = {
    isOpen: boolean;
    order: TProfileDetailedOrder | TFeedDetailedOrder | null;
    hasError: boolean;
    isLoading: boolean;
}

export const initialState: TOrderInitial = {
    isOpen: false,
    order: null,
    hasError: false,
    isLoading: false,
};

export const orderReducer = (state = initialState, action: TOrderActions) => {
    switch (action.type) {
        case MODAL_CLOSE:
            return {
                ...state,
                isOpen: false,
                isLoading: false,
                hasError: false,
            };
        case MODAL_OPEN:
            return {
                ...state,
                isOpen: true,
            };
        case GET_ORDER_SUCCESS:
            return {
                ...state,
                order: action.data
            };
        case GET_ORDER_FAILED:
            return {
                ...state,
                hasError: true
            };
        case ORDER_MODAL_DATA_LOADING_ON:
            return {
                ...state,
                isLoading: true,
            };
        case ORDER_MODAL_DATA_LOADING_OFF:
            return {
                ...state,
                isLoading: false,
            };
        case GET_CURRENT_ORDER_INFO:
            return {
                ...state,
                order: action.data[0],
            };
        default:
            return state;
    }
};