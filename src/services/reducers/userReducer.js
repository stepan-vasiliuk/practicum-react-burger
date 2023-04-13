import {AUTH_CHECKED, CLEAR_USER_DATA, SET_USER, USER_REGISTER_FAILED, USER_REGISTER_SUCCESS} from "../actionTypes";
import {compareArraysAsSet} from "@testing-library/jest-dom/dist/utils";

const initialState = {
    user: null,
    isAuthChecked: false,
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.data.user,
                isAuthChecked: true,
            }
        case AUTH_CHECKED:
            return {
                ...state,
                isAuthChecked: action.data,
            }

        case CLEAR_USER_DATA:
            return {
                ...state,
                user: null,
            }

        case USER_REGISTER_FAILED:
            return {
                ...state,
                user: null,
                isAuthChecked: true,
            }
        default:
            return state;
    }

}