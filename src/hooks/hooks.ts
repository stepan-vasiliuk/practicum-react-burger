import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook,
} from "react-redux";
import {RootState} from "../services";
import {AppDispatch} from "../utils/types";
import type {} from "redux-thunk/extend-redux";

export const useTypedDispatch: () => AppDispatch = dispatchHook;
export const useTypedSelector: TypedUseSelectorHook<RootState> = selectorHook;

