import {createAction} from "@reduxjs/toolkit";
import {TFeedOrders} from "../../utils/types";

export type TWSOrderActions = ReturnType<typeof wsOrderConnect>
    | ReturnType<typeof wsOrderDisconnect>
    | ReturnType<typeof wsOrderConnecting>
    | ReturnType<typeof wsOrderOpen>
    | ReturnType<typeof wsOrderClose>
    | ReturnType<typeof wsOrderMessage>
    | ReturnType<typeof wsOrderError>;

export const wsOrderConnect = createAction<string, 'WS_ORDER_CONNECT'>('WS_ORDER_CONNECT');
export const wsOrderDisconnect =  createAction('WS_ORDER_DISCONNECT');
export const wsOrderConnecting = createAction('WS_ORDER_CONNECTING');
export const wsOrderOpen = createAction('WS_ORDER_OPEN');
export const wsOrderClose = createAction('WS_ORDER_CLOSE');
export const wsOrderMessage = createAction<TFeedOrders, 'WS_ORDER_MESSAGE'>('WS_ORDER_MESSAGE');
export const wsOrderError = createAction<string, 'WS_ORDER_ERROR'>('WS_ORDER_ERROR');