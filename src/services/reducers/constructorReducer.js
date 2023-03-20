import {
    ADD_BUN,
    ADD_INGREDIENT, CLEAR_CONSTRUCTOR_DATA,
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS, REMOVE_INGREDIENT,
    TOTAL_PRICE_UPDATE,
    UPDATE_INGREDIENTS
} from "../actionTypes";

const initialState = {
    ingredientsList: [],
    totalPrice: 0,
    bun: {},
}

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                totalPrice: action.data.price,
                ingredientsList: [
                    ...state.ingredientsList,
                    {
                        ...action.data,
                        key: action.key,
                    }
                ]
            }
        case ADD_BUN:
            return {
                ...state,
                bun: action.data
            }
        case UPDATE_INGREDIENTS:
            return {
                ...state,
                ingredientsList: action.data,
            }
        case REMOVE_INGREDIENT:
            return {
                ...state,
                ingredientsList: action.data,
            }
        case CLEAR_CONSTRUCTOR_DATA:
            return {
                ...state,
                ingredientsList: [],
                bun: {},
            }

        case TOTAL_PRICE_UPDATE:
            return {
                ...state,
                totalPrice: action.data,
            }

        default:
            return state;

    }
}