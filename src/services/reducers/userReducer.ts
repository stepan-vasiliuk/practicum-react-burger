import {
    AUTH_CHECKED,
    CLEAR_USER_DATA,
    EMAIL_SENT,
    SET_USER,
    USER_REGISTER_FAILED,
} from "../actionTypes";
import {TUserActions} from "../actions/userActions";
import {IUser} from "../../utils/types";

type TUserInitial = {
    user: IUser | null;
    isAuthChecked: boolean;
    emailSent: boolean;
}

const initialState: TUserInitial = {
    user: null,
    isAuthChecked: false,
    emailSent: false,
}

export const userReducer = (state = initialState, action: TUserActions): TUserInitial => {
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

        case EMAIL_SENT:
            return {
                ...state,
                emailSent: action.data,
            }
        default:
            return state;
    }

}