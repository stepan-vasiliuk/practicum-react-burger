import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook,
} from "react-redux";
import {RootState} from "../services";
import {AppDispatch} from "../utils/types";

export const useDispatch = dispatchHook as () => AppDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
