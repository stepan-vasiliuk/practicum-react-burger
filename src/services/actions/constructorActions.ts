import {IConstructorIngredient, IIngredient} from "../../utils/types";
import {ADD_BUN, ADD_INGREDIENT, CLEAR_CONSTRUCTOR_DATA, REMOVE_INGREDIENT, UPDATE_INGREDIENTS} from "../actionTypes";
import {v4 as uuid} from "uuid";
import exp from "constants";

export type TAddIngredient = {
    readonly type: typeof ADD_INGREDIENT;
    readonly data: IIngredient;
    readonly key: string;
}

export type TUpdateIngredients = {
    readonly type: typeof UPDATE_INGREDIENTS;
    readonly dragIndex: number;
    readonly hoverIndex: number;
}

export type TRemoveIngredient = {
    readonly type: typeof REMOVE_INGREDIENT;
    readonly data: readonly IConstructorIngredient[];
}

export type TAddBun = {
    readonly type: typeof ADD_BUN;
    readonly data: IIngredient;
}

export type TClearConstructor = {
    readonly type: typeof CLEAR_CONSTRUCTOR_DATA;
}

export type TConstructorActions = TAddIngredient
    | TUpdateIngredients
    | TRemoveIngredient
    | TAddBun
    | TClearConstructor;



export function addIngredient(ingredient: IIngredient): TAddIngredient {
    return {
        type: ADD_INGREDIENT,
        data: ingredient,
        key: uuid(),
    };
}

export function updateIngredients(dragIndex: number, hoverIndex: number): TUpdateIngredients {

    return {
        type: UPDATE_INGREDIENTS,
        dragIndex: dragIndex,
        hoverIndex: hoverIndex,
    };
}

export function removeIngredient(updatedList: Array<IConstructorIngredient>): TRemoveIngredient {
    return {
        type: REMOVE_INGREDIENT,
        data: updatedList,
    };
}

export function addBun(bun: IIngredient): TAddBun {
    return {
        type: ADD_BUN,
        data: bun,
    };
}

export function clearConstructor(): TClearConstructor {
    return {
        type: CLEAR_CONSTRUCTOR_DATA,
    };
}