import {IIngredient, IUser} from "./types";
import {TFormParams} from "./form";

export const BASE_URL = 'https://norma.nomoreparties.space/api/';

export type TResponse = {
    accessToken?: string;
    refreshToken?: string;
    order?: {
        number: number;
    };
    success : boolean;
    data? : Array<IIngredient>;
}

const checkResponse = <T extends TResponse>(res: Response): Promise<T> => {
    return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
}

export const checkSuccess = <T extends TResponse>(value: T): Promise<T>  => {
    if (value && value.success) {
        return Promise.resolve(value);
    }
    throw Error(`Data was not success >>> ${value}`);
}

export const request = <T extends TResponse>(endpoint: string, options?: RequestInit): Promise<T> => {
    return fetch (`${BASE_URL}${endpoint}`, options)
        .then(checkResponse)
        .then(checkSuccess) as Promise<T>
}

export const ingredientsRequest = () => {
    return request(`ingredients`);
}


export const orderRequest = (data: string[], token: string) => {
    return request(`orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: token,
        },
        body: JSON.stringify({
            ingredients: data,
        })
    })
}


export const registerRequest = (data: Record<string, string>) => {
    return request(`auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }
    )
}

export const loginRequest = async (data: TFormParams) => {
    return request(`auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }
    )
}

export const passwordResetRequest = async (email: string) => {
    return request(`password-reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(email),
        }
    )

}

export const passwordRecoveryRequest = async (data: Record<string, string>) => {
    return request(`password-reset/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data),
        }
    )
}

export const userDataUpdateRequest = async (data: TFormParams) => {
    return request(`auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: localStorage.getItem("accessToken") ?? '',
        },
        body: JSON.stringify(data),
    })
}

export const logOutRequest = () => {
    return request(`auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    })

}
export const refreshToken = (): Promise <Record<string, string>>  => {
    return request<Record <string, string> & TResponse>(`auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    })
}

export const fetchWithRefresh = async (url: string, options: RequestInit) => {
    try {
         return await request(`${url}`, options);
    } catch (err: unknown) {

        if ((err as Error).message === 'jwt expired') {
            console.log('JWT expired');
            const refreshData = await refreshToken();
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem('accessToken', refreshData.accessToken);

            options.headers = {
                ...options.headers,
                authorization: refreshData.accessToken,
            }
            return await request(url, options);
        } else {
            return Promise.reject(err);
        }
    }
}
