import {
    DATA_ERROR_DISPLAY_ON,
    DATA_LOADING_OFF,
    DATA_LOADING_ON, INGREDIENTS_GET_FAILED,
    INGREDIENTS_GET_SUCCESS,
    INGREDIENTS_LOAD
} from "../actionTypes";
import {TDataActions} from "../actions/dataActions";
import {IIngredient} from "../../utils/types";

type TDataInitial = {
    isLoading: boolean,
    hasError: boolean,
    data: ReadonlyArray <IIngredient> | []
}

export const initialState: TDataInitial = {
    isLoading: false,
    hasError: false,
    data: []
}

export const dataReducer = (state = initialState, action: TDataActions): TDataInitial => {
    switch (action.type) {
        case INGREDIENTS_GET_SUCCESS:
            return {
                ...state,
                data: action.data,
            }
        case INGREDIENTS_GET_FAILED:
            return {
                ...state,
                isLoading: false,
                hasError: true,
            }

        case DATA_ERROR_DISPLAY_ON:
            return {
                ...state,
                hasError: true,
            }
        case DATA_LOADING_ON:
            return {
                ...state,
                isLoading: true
            }
        case DATA_LOADING_OFF:
            return {
                ...state,
                isLoading: false,
            }

        default:
            return state;
    }
}