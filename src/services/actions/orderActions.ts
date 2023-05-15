import {
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
    INGREDIENTS_GET_SUCCESS,
    MODAL_CLOSE,
    MODAL_OPEN, ORDER_MODAL_DATA_LOADING_OFF,
    ORDER_MODAL_DATA_LOADING_ON
} from "../actionTypes";
import {IIngredient} from "../../utils/types";


export type TModalOpen = {
    readonly type: typeof MODAL_OPEN;
}

export type TModalClose = {
    readonly type: typeof MODAL_CLOSE;
}

export type TGetOrderSuccess = {
    readonly type: typeof GET_ORDER_SUCCESS;
    readonly data: number;
}

export type TGetOrderFailed = {
    readonly type: typeof GET_ORDER_FAILED;
}

export type TOrderDataLoadingOn = {
    readonly type: typeof ORDER_MODAL_DATA_LOADING_ON,
}

export type TOrderDataLoadingOff = {
    readonly type: typeof ORDER_MODAL_DATA_LOADING_OFF,
}

export type TOrderActions = TModalOpen
    | TModalClose
    | TGetOrderSuccess
    | TGetOrderFailed
    | TOrderDataLoadingOn
    | TOrderDataLoadingOff;


export function modalOpen(): TModalOpen {
    return {
        type: MODAL_OPEN,
    };
}

export function modalClose(): TModalClose {
    return {
        type: MODAL_CLOSE
    };
}

export function getOrderSuccess(orderNumber: number): TGetOrderSuccess {
    return {
        type: GET_ORDER_SUCCESS,
        data: orderNumber,
    };
}

export function getOrderFailed(): TGetOrderFailed {
    return {
        type: GET_ORDER_FAILED,
    };
}

export function orderDataLoadingOn(): TOrderDataLoadingOn {
    return {
        type: ORDER_MODAL_DATA_LOADING_ON,
    };
}

export function orderDataLoadingOff(): TOrderDataLoadingOff {
    return {
        type: ORDER_MODAL_DATA_LOADING_OFF,
    };
}