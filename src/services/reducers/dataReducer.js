import {
    DATA_ERROR_DISPLAY_ON,
    DATA_LOADING_OFF,
    DATA_LOADING_ON, INGREDIENTS_GET_FAILED,
    INGREDIENTS_GET_SUCCESS,
    INGREDIENTS_LOAD
} from "../actionTypes";

const initialState = {
    isLoading: false,
    hasError: false,
    data: []
}

export const dataReducer = (state = initialState, action) => {
    console.log(`dataReducer >>>`, action.data)
    switch (action.type) {
        case INGREDIENTS_GET_SUCCESS:
            return {
                ...state,
                data: action.data,
            }
        case INGREDIENTS_GET_FAILED:
            return {
                ...state,
                isLoading: false,
                hasError: true,
            }
        // case INGREDIENTS_LOAD:
        //     return {
        //         ...state,
        //         data: action.data
        //     }
        case DATA_ERROR_DISPLAY_ON:
            console.log(action.data);
            return {
                ...state,
                hasError: true,
            }
        case DATA_LOADING_ON:
            console.log('Data loading...')
            return {
                ...state,
                isLoading: true
            }
        case DATA_LOADING_OFF:
            console.log('Data loading off')
            return {
                ...state,
                isLoading: false,
            }

        default:
            return state;
    }
}