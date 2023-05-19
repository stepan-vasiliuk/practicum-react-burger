import thunkMiddleware from 'redux-thunk';
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {rootReducer} from "./reducers/rootReducer";
import {TConstructorActions} from "./actions/constructorActions";
import {TDataActions} from "./actions/dataActions";
import {TOrderActions} from "./actions/orderActions";
import {TUserActions} from "./actions/userActions";
import {
    feedConnect,
    feedDisconnect,
    feedWsClose, feedWsConnecting,
    feedWsError,
    feedWsMessage, feedWsOpen,
    TFeedActions
} from "./actions/wsFeedActions";
import {socketMiddleware} from "./middleware/socket-middleware";

export type RootState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const middlewares = [thunkMiddleware, socketFeedMiddleWare];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const enhancers = [middlewareEnhancer]
    const composedEnhancers = composeWithDevTools(...enhancers);

    const store = createStore(rootReducer, composedEnhancers);

    return store;
}

const socketFeedMiddleWare = socketMiddleware({
    wsConnect: feedConnect,
    wsDisconnect: feedDisconnect,
    onClose: feedWsClose,
    onError: feedWsError,
    onMessage: feedWsMessage,
    onOpen: feedWsOpen,
    wsConnecting: feedWsConnecting,
})

export type AppActions = TConstructorActions
    | TDataActions
    | TOrderActions
    | TUserActions
    | TFeedActions