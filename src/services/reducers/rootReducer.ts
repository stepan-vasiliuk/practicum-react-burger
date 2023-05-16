import {combineReducers} from "redux";
import {dataReducer} from "./dataReducer";
import {orderReducer} from "./orderReducer";
import {constructorReducer} from "./constructorReducer";
import {userReducer} from "./userReducer";

export const rootReducer = combineReducers({
    dataReducer,
    orderReducer,
    constructorReducer,
    userReducer,
})