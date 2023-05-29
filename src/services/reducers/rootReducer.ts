import {combineReducers} from "redux";
import {dataReducer} from "./dataReducer";
import {orderReducer} from "./orderReducer";
import {constructorReducer} from "./constructorReducer";
import {userReducer} from "./userReducer";
import {wsFeedReducer} from "./wsFeedReducer";
import {wsOrderReducer} from "./wsOrderReducer";

export const rootReducer = combineReducers({
    dataReducer,
    orderReducer,
    constructorReducer,
    userReducer,
    wsFeedReducer,
    wsOrderReducer,
})