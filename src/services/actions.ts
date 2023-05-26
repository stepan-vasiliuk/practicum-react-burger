import {
    fetchWithRefresh, ingredientsRequest,
    loginRequest, logOutRequest, orderRequest,
    passwordRecoveryRequest,
    passwordResetRequest,
    registerRequest, singleOrderRequest, userDataUpdateRequest
} from "../utils/api";
import {AppThunk, IUser, TFeedDetailedOrder, TFeedOrders} from "../utils/types";
import {
    dataErrorOn,
    dataLoadingOff,
    dataLoadingOn,
    ingredientsGetFailed,
    ingredientsGetSuccess
} from "./actions/dataActions";
import {
    getCurrentOrderInfo,
    getOrderFailed,
    getOrderSuccess,
    orderDataLoadingOff,
    orderDataLoadingOn
} from "./actions/orderActions";
import {clearUserData, emailSent, setAuthChecked, setUser, userRegisterFailed} from "./actions/userActions";
import {TFormParams} from "../utils/form";

export function ingredientsLoad(): AppThunk {
    return async dispatch => {
        try {
            dispatch(dataLoadingOn());
            const jsonData = await ingredientsRequest();
            dispatch(ingredientsGetSuccess(jsonData.data!));
            dispatch(dataLoadingOff());
        } catch (e) {
            dispatch(dataErrorOn("Ошибка при получении данных ингредиентов из API"));
            dispatch(ingredientsGetFailed());
            dispatch(dataLoadingOff());
        }
    };
}


/**
 * Working with orderInfo creating:
 */
export function createOrder(ingredients: string[]): AppThunk {
    return async dispatch => {
        try {
            dispatch(orderDataLoadingOn());
            const jsonData = await orderRequest(ingredients, localStorage.getItem("accessToken")!);
            if (jsonData.order) {
                dispatch(getOrderSuccess(jsonData.order));
                dispatch(orderDataLoadingOff());
            }
        } catch (e) {
            console.log("An error has occurred while getting OrderInfo data from API >>> ");
            dispatch(getOrderFailed());
            dispatch(orderDataLoadingOff());
        }
    };
}

export function getOrder(orderNumber: number): AppThunk {
    return async dispatch => {
        try {
            const jsonData = await singleOrderRequest(orderNumber);
            if (jsonData.orders) {
                dispatch(getCurrentOrderInfo(jsonData.orders))
            }
            else {
                console.log('Ошибка..')
                console.log('jsonData:', jsonData);
            }
        } catch (e) {
            console.log("Get Order Error >>> ", e);
        }
    };
}

export function checkUserAuth(): AppThunk {
    return async dispatch => {
        if (localStorage.getItem("accessToken")) {
            dispatch(getUser())
                .catch((e: Error) => {
                    console.log("localStorage getItem Error>>", e);
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    dispatch(clearUserData());
                })
                .finally(() => dispatch(setAuthChecked(true)));
        } else {
            dispatch(setAuthChecked(true));
        }
    };
}

export function getUser(): AppThunk<Promise<unknown>> {
    return dispatch => {
        return fetchWithRefresh(`auth/user`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    authorization: localStorage.getItem("accessToken")

                } as HeadersInit
            }).then(jsonData => dispatch(setUser(jsonData)))
            .catch(err => {
                console.log("Ошибка при получении информации о пользователе", err);
            });
    };
}

export function userRegister(userData: TFormParams): AppThunk {
    return async dispatch => {
        try {
            const jsonData = await registerRequest(userData);
            console.log("Json Data>>>", jsonData);
            localStorage.setItem("accessToken", jsonData.accessToken!);
            localStorage.setItem("refreshToken", jsonData.refreshToken!);
            dispatch(setUser(jsonData));
        } catch (e) {
            console.log("Ошибка при регистрации", e);
            dispatch(userRegisterFailed());
        }
    };
}

export function userLogin(userData: TFormParams): AppThunk {
    return async dispatch => {
        try {
            const jsonData = await loginRequest(userData);
            console.log("Auth JSON data >>>>", jsonData);
            localStorage.setItem("accessToken", jsonData.accessToken!);
            localStorage.setItem("refreshToken", jsonData.refreshToken!);
            dispatch(setUser(jsonData));
        } catch (e) {
            console.log("Ошибка при авторизации", e);
            dispatch(userRegisterFailed());
        }
    };
}

export function resetPassword(email: string): AppThunk {
    return async dispatch => {
        try {
            const jsonData = await passwordResetRequest(email);
            console.log("Reset pass success:\n", jsonData);
            dispatch(emailSent(true));
        } catch (err) {
            console.log("Ошибка при сбросе пароля:\n", err);
        }
    };
}

export function passwordRecovery(data: TFormParams): AppThunk {
    return async dispatch => {
        try {
            const jsonData = await passwordRecoveryRequest(data);
            console.log("Reset pass success:\n", jsonData);
            dispatch(emailSent(false));
        } catch (err) {
            console.log("Ошибка при сбросе пароля:\n", err);
        }
    };

}

export function updateUserData(updatedForm: TFormParams): AppThunk {
    return async dispatch => {
        try {
            const jsonData = await userDataUpdateRequest(updatedForm);
            dispatch(setUser(jsonData));
        } catch (err) {
            console.log("Ошибка при изменении данных пользователя\n", err);
        }
    };
}

export function userLogOut(): AppThunk {
    return async dispatch => {
        try {
            await logOutRequest();
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            dispatch(clearUserData());
        } catch (err) {
            console.log("Ошибка при выходе\n", err);
        }
    };
}