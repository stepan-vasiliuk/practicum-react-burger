import {combineReducers} from "redux";
import {dataReducer} from "./dataReducer";
import {modalReducer} from "./modalReducer";
import {constructorReducer} from "./constructorReducer";

export const rootReducer = combineReducers({
    dataReducer,
    modalReducer,
    constructorReducer,
})