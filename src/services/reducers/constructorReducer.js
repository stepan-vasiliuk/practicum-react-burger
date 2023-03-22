import {
    ADD_BUN,
    ADD_INGREDIENT, CLEAR_CONSTRUCTOR_DATA,
    REMOVE_INGREDIENT,
    UPDATE_INGREDIENTS
} from "../actionTypes";

const initialState = {
    ingredientsList: [],
    bun: null,
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
            const updatedList = [...state.ingredientsList];
            const dragItem = updatedList[action.dragIndex];
            updatedList.splice(action.dragIndex, 1);
            updatedList.splice(action.hoverIndex, 0, dragItem)
            return {
                ...state,
                ingredientsList: updatedList,
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
                bun: null,
            }

        default:
            return state;

    }
}