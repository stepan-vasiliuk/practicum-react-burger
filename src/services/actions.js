import {
    ADD_BUN,
    ADD_INGREDIENT, AUTH_CHECKED, CLEAR_CONSTRUCTOR_DATA, CLEAR_USER_DATA,
    DATA_ERROR_DISPLAY_OFF,
    DATA_ERROR_DISPLAY_ON,
    DATA_LOADING_OFF,
    DATA_LOADING_ON, EMAIL_SENT,
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
    INGREDIENTS_GET_FAILED,
    INGREDIENTS_GET_SUCCESS,
    INGREDIENTS_LOAD,
    MODAL_CLOSE,
    MODAL_OPEN, ORDER_MODAL_DATA_LOADING_OFF,
    ORDER_MODAL_DATA_LOADING_ON,
    REMOVE_INGREDIENT, SET_USER,
    UPDATE_INGREDIENTS, USER_REGISTER_FAILED,
} from "./actionTypes";
import {v4 as uuid} from 'uuid';
import {
    BASE_URL,
    fetchWithRefresh, ingredientsRequest,
    loginRequest, logOutRequest, orderRequest,
    passwordRecoveryRequest,
    passwordResetRequest,
    registerRequest, userDataUpdateRequest
} from "../utils/api";

export function ingredientsLoad() {
    return async dispatch => {
        try {
            dispatch(dataLoadingOn())
            const jsonData = await ingredientsRequest();
            dispatch({
                type: INGREDIENTS_GET_SUCCESS,
                data: jsonData.data
            })
            dispatch(dataLoadingOff())
        } catch (e) {
            dispatch(dataErrorOn('Ошибка при получении данных ингредиентов из API'));
            dispatch({
                type: INGREDIENTS_GET_FAILED,
            })
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

export function modalOpen() {
    return {
        type: MODAL_OPEN,
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
            const jsonData = await orderRequest(ingredients, localStorage.getItem('accessToken'));
            dispatch({
                type: GET_ORDER_SUCCESS,
                data: jsonData.order.number
            })
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

/**
 * Работа с данными пользователя
 * @param userData
 * @returns {(function(*): Promise<void>)|*}
 */

export function setAuthChecked(isChecked) {
    return {
        type: AUTH_CHECKED,
        data: isChecked,
    }
}

export function clearUserData() {
    return {
        type: CLEAR_USER_DATA,
    }
}

export function checkUserAuth() {
    return async dispatch => {
        if (localStorage.getItem('accessToken')) {
            dispatch(getUser())
                .catch((e) => {
                    console.log('localStorage getItem Error>>', e);
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    dispatch(clearUserData());
                })
                .finally(() => dispatch(setAuthChecked(true)));
        } else {
            dispatch(setAuthChecked(true));
        }
    }
}

export function getUser() {
    return async dispatch => {
        try {
            const jsonData = await fetchWithRefresh(`auth/user`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        authorization: localStorage.getItem("accessToken")

                    }
                })
            dispatch({
                type: SET_USER,
                data: jsonData,
            })
        } catch (err) {
            console.log('Ошибка при получении информации о пользователе', err)
        }
    }
}

export function userRegister(userData) {
    return async dispatch => {
        try {
            const jsonData = await registerRequest(userData);
            console.log('Json Data>>>', jsonData);
            localStorage.setItem('accessToken', jsonData.accessToken);
            localStorage.setItem('refreshToken', jsonData.refreshToken);
            dispatch({
                type: SET_USER,
                data: jsonData
            })
        } catch (e) {
            console.log('Ошибка при регистрации', e);
            dispatch({
                type: USER_REGISTER_FAILED,
            })
        }
    }
}

export function userLogin(userData) {
    return async dispatch => {
        try {
            const jsonData = await loginRequest(userData);
            console.log('Auth JSON data >>>>', jsonData);
            localStorage.setItem('accessToken', jsonData.accessToken);
            localStorage.setItem('refreshToken', jsonData.refreshToken);
            dispatch({
                type: SET_USER,
                data: jsonData,
            })
        } catch (e) {
            console.log('Ошибка при авторизации', e);
            dispatch({
                type: USER_REGISTER_FAILED,
            })
        }
    }
}

export function resetPassword(email) {
    return async dispatch => {
        try {
            const jsonData = await passwordResetRequest(email);
            console.log('Reset pass success:\n', jsonData);
            dispatch({
                type: EMAIL_SENT,
                data: true,
            })
        } catch (err) {
            console.log('Ошибка при сбросе пароля:\n', err);
        }
    }
}

export function passwordRecovery(data) {
    return async dispatch => {
        try {
            const jsonData = await passwordRecoveryRequest(data);
            console.log('Reset pass success:\n', jsonData);
            dispatch({
                type: EMAIL_SENT,
                data: false,
            })
        } catch (err) {
            console.log('Ошибка при сбросе пароля:\n', err);
        }
    }

}

export function updateUserData(updatedForm) {
    return async dispatch => {
        try {
            const jsonData = await userDataUpdateRequest(updatedForm);
            dispatch({
                type: SET_USER,
                data: jsonData,
            })
        } catch (err) {
            console.log('Ошибка при изменении данных пользователя\n', err);
        }
    }
}

export function userLogOut() {
    return async dispatch => {
        try {
            await logOutRequest();
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            dispatch(clearUserData());
        } catch (err) {
            console.log('Ошибка при выходе\n', err);
        }
    }
}