import {TFeedOrders, WebsocketStatus} from "../../utils/types";
import {createReducer} from "@reduxjs/toolkit";
import {wsOrderClose, wsOrderConnecting, wsOrderError, wsOrderMessage, wsOrderOpen} from "../actions/wsOrderActions";

export type TWSOrderState = {
    status: WebsocketStatus;
    orders: TFeedOrders | null;
    connectionError: string;
}

export const initialState: TWSOrderState = {
    status: WebsocketStatus.OFFLINE,
    orders: null,
    connectionError: "",
};

export const wsOrderReducer = createReducer(initialState, builder => {
    builder
        .addCase(wsOrderOpen, (state) => {
            state.status = WebsocketStatus.ONLINE;
            state.connectionError = "";
        })
        .addCase(wsOrderClose, (state) => {
            state.status = WebsocketStatus.OFFLINE;
            state.orders = null;
            state.connectionError = "";
        })
        .addCase(wsOrderError, (state, action) => {
            state.connectionError = action.payload;
        })
        .addCase(wsOrderMessage, (state, action) => {
            state.orders = action.payload;
        })
        .addCase(wsOrderConnecting, (state) => {
            state.status = WebsocketStatus.CONNECTING;
            state.connectionError = "";
        });

});