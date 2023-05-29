import {ActionCreatorWithoutPayload, ActionCreatorWithPayload, Middleware} from "@reduxjs/toolkit";
import {RootState} from "../index";

export type TWsActions = {
    wsConnect: ActionCreatorWithPayload<string>;
    wsDisconnect: ActionCreatorWithoutPayload;
    wsSendMessage?: ActionCreatorWithPayload<any>;
    wsConnecting: ActionCreatorWithoutPayload;
    onOpen: ActionCreatorWithoutPayload;
    onClose: ActionCreatorWithoutPayload;
    onError: ActionCreatorWithPayload<string>;
    onMessage: ActionCreatorWithPayload<any>;

}
export const socketMiddleware = (wsActions: TWsActions): Middleware<{}, RootState> => {
    return store => {
        let socket: WebSocket | null = null;

        return next => action => {
            const {dispatch} = store;
            const {
                wsConnect, wsDisconnect, wsSendMessage, wsConnecting, onOpen, onClose
                , onError
                , onMessage
            } = wsActions;
            if (wsConnect.match(action)) {
                socket = new WebSocket(action.payload);
                dispatch(wsConnecting());
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch(onOpen());
                };

                socket.onerror = event => {
                    dispatch(onError("Возникла ошибка соединения с веб-сокетом"));
                };

                socket.onmessage = event => {
                    const {data} = event;
                    const parsedData = JSON.parse(data);
                    const {success, ...restData} = parsedData;
                    dispatch(onMessage(restData));
                };

                socket.onclose = event => {
                    dispatch(onClose());
                };
                if (wsSendMessage?.match(action)) {
                    socket.send(JSON.stringify(action.payload));
                }

                if (wsDisconnect.match(action)) {
                    socket.close();
                    socket = null;
                }
            }
            next(action);
        };
    };
};