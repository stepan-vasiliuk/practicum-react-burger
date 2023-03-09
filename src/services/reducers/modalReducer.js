import {MODAL_CLOSE, MODAL_OPEN} from "../actionTypes";

const initialState = {
    isOpen: false,
    ingredient: {},

}

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case MODAL_CLOSE:
            return {
                ...state,
                isOpen: false,
                ingredient: null
            }
        case MODAL_OPEN:
            return {
                ...state,
                isOpen: true,
                ingredient: action.data,
            }
        default:
            return state;
    }
}