import {AUTH_CHECKED, CLEAR_USER_DATA, EMAIL_SENT, SET_USER, USER_REGISTER_FAILED} from "../actionTypes";
import {IUser, IUserWithToken} from "../../utils/types";

export type TSetAuthChecked = {
    readonly type: typeof AUTH_CHECKED;
    readonly data: boolean;
}

export type TClearUserData = {
    readonly type: typeof CLEAR_USER_DATA;
}

export type TSetUser = {
    readonly type: typeof SET_USER;
    readonly data: {
        user: {
            email: string,
            name: string,
        }
    };
}

export type TUserRegisterFailed = {
    readonly type: typeof USER_REGISTER_FAILED,
}

export type TEmailSent = {
    readonly type: typeof EMAIL_SENT,
    readonly data: boolean,
}
 export type TUserActions = TSetAuthChecked
     | TClearUserData
     | TSetUser
     | TUserRegisterFailed
     | TEmailSent;



export function setAuthChecked(isChecked: boolean): TSetAuthChecked {
    return {
        type: AUTH_CHECKED,
        data: isChecked,
    };
}

export function clearUserData(): TClearUserData {
    return {
        type: CLEAR_USER_DATA,
    };
}

//TODO: Определить, какой тип данных приходит в JsonData(userData)
export function setUser(userData: any): TSetUser {
    return {
        type: SET_USER,
        data: userData,
    };
}

export function userRegisterFailed(): TUserRegisterFailed {
    return {
        type: USER_REGISTER_FAILED,
    };
}

export function emailSent(data: boolean): TEmailSent{
    return{
        type: EMAIL_SENT,
        data: data,
    }
}