import {ADD_BUN, ADD_INGREDIENT, TOTAL_PRICE_UPDATE} from "../actionTypes";

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
                    }
                ]
            }
        case ADD_BUN:
            return {
                ...state,
                bun: action.data
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