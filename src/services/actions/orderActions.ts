import {
    GET_CURRENT_ORDER_INFO,
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
    INGREDIENTS_GET_SUCCESS,
    MODAL_CLOSE,
    MODAL_OPEN, ORDER_MODAL_DATA_LOADING_OFF,
    ORDER_MODAL_DATA_LOADING_ON
} from "../actionTypes";
import {IIngredient, TFeedDetailedOrder, TProfileDetailedOrder} from "../../utils/types";


export type TModalOpen = {
    readonly type: typeof MODAL_OPEN;
}

export type TModalClose = {
    readonly type: typeof MODAL_CLOSE;
}

export type TGetOrderSuccess = {
    readonly type: typeof GET_ORDER_SUCCESS;
    readonly data: TProfileDetailedOrder;
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

export type TGetCurrentOrderInfo = {
    readonly type: typeof GET_CURRENT_ORDER_INFO;
    readonly data: Array<TFeedDetailedOrder>;
}

export type TOrderActions = TModalOpen
    | TModalClose
    | TGetOrderSuccess
    | TGetOrderFailed
    | TOrderDataLoadingOn
    | TOrderDataLoadingOff
    | TGetCurrentOrderInfo;


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

export function getOrderSuccess(order: TProfileDetailedOrder): TGetOrderSuccess {
    return {
        type: GET_ORDER_SUCCESS,
        data: order,
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

/**
 * Экшен получения конкретного заказа по его номеру
 * @param orders
 */
export function getCurrentOrderInfo(orders: Array<TFeedDetailedOrder>): TGetCurrentOrderInfo {
    return {
        type: GET_CURRENT_ORDER_INFO,
        data: orders,
    };
}