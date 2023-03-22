import {
    ADD_BUN,
    ADD_INGREDIENT, CLEAR_CONSTRUCTOR_DATA,
    DATA_ERROR_DISPLAY_OFF,
    DATA_ERROR_DISPLAY_ON,
    DATA_LOADING_OFF,
    DATA_LOADING_ON,
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
    INGREDIENTS_GET_FAILED,
    INGREDIENTS_GET_SUCCESS,
    INGREDIENTS_LOAD,
    MODAL_CLOSE,
    MODAL_OPEN, ORDER_MODAL_DATA_LOADING_OFF,
    ORDER_MODAL_DATA_LOADING_ON,
    REMOVE_INGREDIENT,
    UPDATE_INGREDIENTS
} from "./actionTypes";
import {v4 as uuid} from 'uuid';

const URL = 'https://norma.nomoreparties.space/api';

export function ingredientsLoad() {
    return async dispatch => {
        try {
            dispatch(dataLoadingOn())
            const response = await fetch(`${URL}/ingredients`);
            let jsonData;
            if (response.ok) {
                jsonData = await response.json();
            } else {
                throw new Error('Error in response')
            }

            if (jsonData.success && jsonData) {
                dispatch({
                    type: INGREDIENTS_GET_SUCCESS,
                    data: jsonData.data
                })
            } else {
                dispatch({
                    type: INGREDIENTS_GET_FAILED,
                })
                dispatch(dataErrorOn('Не выполнено условие получения данных'))
            }
            dispatch(dataLoadingOff())
        } catch (e) {
            dispatch(dataErrorOn('Ошибка при получении данных ингредиентов из API'));
            dispatch(dataLoadingOff());
        }
    }
}

export function dataErrorOn(text) {
    return {
        type: DATA_ERROR_DISPLAY_ON,
        data: text
    }
}

export function dataErrorOff() {
    return {
        type: DATA_ERROR_DISPLAY_OFF,
    }
}

export function dataLoadingOn() {
    return {
        type: DATA_LOADING_ON
    }
}

export function dataLoadingOff() {
    return {
        type: DATA_LOADING_OFF
    }
}

export function modalOpen(ingredient) {
    return {
        type: MODAL_OPEN,
        data: ingredient
    }
}

export function modalClose() {
    return {
        type: MODAL_CLOSE
    }
}

export function addIngredient(ingredient) {
    return {
        type: ADD_INGREDIENT,
        data: ingredient,
        key: uuid(),
    }
}

export function updateIngredients(dragIndex, hoverIndex) {

    return {
        type: UPDATE_INGREDIENTS,
        dragIndex: dragIndex,
        hoverIndex: hoverIndex,
    }
}

export function removeIngredient(updatedList) {
    return {
        type: REMOVE_INGREDIENT,
        data: updatedList,
    }
}

export function addBun(bun) {
    return {
        type: ADD_BUN,
        data: bun,
    }
}

export function clearConstructor() {
    return {
        type: CLEAR_CONSTRUCTOR_DATA,
    }
}


/**
 * Working with order creating:
 */
export function createOrder(ingredients) {
    return async dispatch => {
        try {
            dispatch(orderDataLoadingOn());

            const response = await fetch(`${URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    ingredients: ingredients,
                })
            });
            let jsonData;
            if (response.ok) {
                jsonData = await response.json();
            } else {
                throw new Error('An error occured in order Response')
            }

            if (jsonData.success && jsonData) {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    data: jsonData.order.number
                })
            } else {
                dispatch({
                    type: GET_ORDER_FAILED,
                })
            }
            dispatch(orderDataLoadingOff());
        } catch (e) {
            console.log('An error has occurred while getting Order data from API >>> ')
            dispatch({
                type: GET_ORDER_FAILED,
            })
            dispatch(orderDataLoadingOff());
        }
    }
}

export function orderDataLoadingOn() {
    return {
        type: ORDER_MODAL_DATA_LOADING_ON,
    }
}

export function orderDataLoadingOff() {
    return {
        type: ORDER_MODAL_DATA_LOADING_OFF,
    }
}