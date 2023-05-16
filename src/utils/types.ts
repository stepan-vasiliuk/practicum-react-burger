import PropTypes from "prop-types";
import {LegacyRef} from "react";
import {ThunkAction} from "redux-thunk";
import {AppActions, RootState} from "../services";
import {access} from "fs";

export const ingredientTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
}).isRequired;

export interface IIngredient {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_large: string,
    image_mobile: string,
}

export interface IConstructorIngredient extends IIngredient {
    key: string,
}

export interface IIngredientCard {
    ingredient: IIngredient | undefined | null;
}

export interface IIngredientType {
    groupType: Array<IIngredient>,
    title: string,
    propsRef: LegacyRef<HTMLDivElement>,
    id: string
}

export interface IUser {
    name: string,
    email: string,
}

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActions>
export type AppDispatch<TReturnType = void> = (
    action: AppActions | AppThunk<TReturnType>
) => TReturnType;

