import thunkMiddleware from 'redux-thunk';
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {rootReducer} from "./reducers/rootReducer";
import {TConstructorActions} from "./actions/constructorActions";
import {TDataActions} from "./actions/dataActions";
import {TOrderActions} from "./actions/orderActions";
import {TUserActions} from "./actions/userActions";

export type RootState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const middlewares = [thunkMiddleware];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const enhancers = [middlewareEnhancer]
    const composedEnhancers = composeWithDevTools(...enhancers);

    const store = createStore(rootReducer, composedEnhancers);

    return store;
}

export type AppActions = TConstructorActions
    | TDataActions
    | TOrderActions
    | TUserActions;