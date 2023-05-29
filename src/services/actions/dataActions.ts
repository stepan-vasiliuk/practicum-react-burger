import {
    DATA_ERROR_DISPLAY_OFF,
    DATA_ERROR_DISPLAY_ON,
    DATA_LOADING_OFF,
    DATA_LOADING_ON, INGREDIENTS_GET_FAILED,
    INGREDIENTS_GET_SUCCESS
} from "../actionTypes";
import {IIngredient} from "../../utils/types";


export type TIngredientsGetSuccess = {
    readonly type: typeof INGREDIENTS_GET_SUCCESS;
    readonly data: ReadonlyArray<IIngredient>;
}

export type TDataErrorOn = {
    readonly type: typeof DATA_ERROR_DISPLAY_ON;
    readonly data: string;
}

export type TDataErrorOff = {
    readonly type: typeof DATA_ERROR_DISPLAY_OFF;
}

export type TDataLoadingOn = {
    readonly type: typeof DATA_LOADING_ON;
}

export type TDataLoadingOff = {
    readonly type: typeof DATA_LOADING_OFF;
}

export type TIngredientsGetFailed = {
    readonly type: typeof INGREDIENTS_GET_FAILED;
}

export type TDataActions = TIngredientsGetSuccess
    | TIngredientsGetFailed
    | TDataErrorOn
    | TDataErrorOff
    | TDataLoadingOn
    | TDataLoadingOff;


export function ingredientsGetFailed(): TIngredientsGetFailed {
    return {
        type: INGREDIENTS_GET_FAILED,
    };
}

export function ingredientsGetSuccess(ingredientsData: IIngredient[]): TIngredientsGetSuccess {
    return {
        type: INGREDIENTS_GET_SUCCESS,
        data: ingredientsData,
    };
}

export function dataErrorOn(text: string): TDataErrorOn {
    return {
        type: DATA_ERROR_DISPLAY_ON,
        data: text
    };
}

export function dataErrorOff(): TDataErrorOff {
    return {
        type: DATA_ERROR_DISPLAY_OFF,
    };
}

export function dataLoadingOn(): TDataLoadingOn {
    return {
        type: DATA_LOADING_ON
    };
}

export function dataLoadingOff(): TDataLoadingOff {
    return {
        type: DATA_LOADING_OFF
    };
}