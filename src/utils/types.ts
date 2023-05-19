import PropTypes from "prop-types";
import {LegacyRef} from "react";
import {ThunkAction} from "redux-thunk";
import {AppActions, RootState} from "../services";
import {access} from "fs";

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

export type TFeedOrders = {
    orders: Array<TFeedDetailedOrder>;
    total: number;
    totalToday: number;
}

export type TFeedDetailedOrder = {
    ingredients: Array<string>;
    _id: string;
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string;
}

export enum WebsocketStatus {
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE',
    CONNECTING = 'CONNECTING',
}
