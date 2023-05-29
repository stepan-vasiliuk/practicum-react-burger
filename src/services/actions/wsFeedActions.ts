import {createAction} from "@reduxjs/toolkit";
import {TFeedOrders} from "../../utils/types";

export type TFeedActions = ReturnType<typeof feedConnect>
    | ReturnType<typeof feedDisconnect>
    | ReturnType<typeof feedWsConnecting>
    | ReturnType<typeof feedWsOpen>
    | ReturnType<typeof feedWsClose>
    | ReturnType<typeof feedWsMessage>
    | ReturnType<typeof feedWsError>;

export const feedConnect = createAction<string, 'FEED_CONNECT'>('FEED_CONNECT');
export const feedDisconnect =  createAction('FEED_DISCONNECT');
export const feedWsConnecting = createAction('FEED_CONNECTING');
export const feedWsOpen = createAction('FEED_WS_OPEN');
export const feedWsClose = createAction('FEED_WS_CLOSE');
export const feedWsMessage = createAction<TFeedOrders, 'FEED_WS_MESSAGE'>('FEED_WS_MESSAGE');
export const feedWsError = createAction<string, 'FEED_WS_ERROR'>('FEED_WS_ERROR');
