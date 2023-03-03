import {
    DATA_ERROR_DISPLAY_OFF,
    DATA_ERROR_DISPLAY_ON,
    DATA_LOADING_OFF,
    DATA_LOADING_ON,
    INGREDIENTS_LOAD
} from "./actionTypes";

const URL = 'https://norma.nomoreparties.space/api/ingredients';

export function ingredientsLoad() {
    return async dispatch => {
        try {
            dispatch(dataLoadingOn())
            const response = await fetch(URL);
            const jsonData = await response.json();
            dispatch({
                type: INGREDIENTS_LOAD,
                data: jsonData.data
            })
            dispatch(dataLoadingOff())
        } catch (e) {
            dispatch(dataErrorOn('Ошибка API'));
            dispatch(dataLoadingOff());
        }
    }
}

export function dataErrorOn(text) {
    return {
        type: DATA_ERROR_DISPLAY_ON,
        payload: text,
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