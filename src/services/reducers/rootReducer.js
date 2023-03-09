import {combineReducers} from "redux";
import {dataReducer} from "./dataReducer";
import {modalReducer} from "./modalReducer";

export const rootReducer = combineReducers({
    dataReducer,
    modalReducer,
})