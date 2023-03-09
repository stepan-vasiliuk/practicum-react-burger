import {
    DATA_ERROR_DISPLAY_OFF,
    DATA_ERROR_DISPLAY_ON,
    DATA_LOADING_OFF,
    DATA_LOADING_ON, INGREDIENTS_GET_FAILED, INGREDIENTS_GET_SUCCESS,
    INGREDIENTS_LOAD, MODAL_CLOSE, MODAL_OPEN
} from "./actionTypes";

const URL = 'https://norma.nomoreparties.space/api/ingredients';

export function ingredientsLoad() {
    return async dispatch => {
        try {
            dispatch(dataLoadingOn())
            const response = await fetch(URL);
            const jsonData = await response.json();
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