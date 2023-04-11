import {USER_REGISTER_SUCCESS} from "../actionTypes";

const initialState = {
    user: null,
    isAuthChecked: false,
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                user: action.data.user,
                isAuthChecked: true,
            }
        default:
            return state;
    }

}