import {TFeedOrders, WebsocketStatus} from "../../utils/types";
import {createReducer} from "@reduxjs/toolkit";
import {feedWsClose, feedWsConnecting, feedWsError, feedWsMessage, feedWsOpen} from "../actions/wsFeedActions";

export type TWsFeedState = {
    status: WebsocketStatus;
    orders: TFeedOrders | null;
    connectionError: string;
}


export const initialState: TWsFeedState = {
    status: WebsocketStatus.OFFLINE,
    orders: null,
    connectionError: "",
};

export const wsFeedReducer = createReducer(initialState, builder => {
    builder
        .addCase(feedWsOpen, (state) => {
            state.status = WebsocketStatus.ONLINE;
            state.connectionError = "";
        })
        .addCase(feedWsClose, (state) => {
            state.status = WebsocketStatus.OFFLINE;
            state.orders = null;
            state.connectionError = "";
        })
        .addCase(feedWsError, (state, action) => {
            state.connectionError = action.payload;
        })
        .addCase(feedWsMessage, (state, action) => {
            state.orders = action.payload;
        })
        .addCase(feedWsConnecting, (state) => {
            state.status = WebsocketStatus.CONNECTING;
            state.connectionError = "";
        })
});