export const BASE_URL = 'https://norma.nomoreparties.space/api/';


const checkResponse = res => {
    return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
}

export const checkSuccess = (res) => {
    if (res && res.success) {
        return res;
    }
    return Promise.reject(`Data was not success >>> ${res}`);
}

export const request = (endpoint, options) => {
    return fetch(`${BASE_URL}${endpoint}`, options)
        .then(checkResponse)
        .then(checkSuccess);
}

export const ingredientsRequest = () => {
    return request(`ingredients`);
}


export const orderRequest = data => {
    return request(`orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            ingredients: data,
        })
    })
}


export const registerRequest = data => {
    return request(`auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }
    )
}

export const loginRequest = async data => {
    return request(`auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }
    )
}

export const passwordResetRequest = async email => {
    return request(`password-reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(email),
        }
    )

}

export const passwordRecoveryRequest = async data => {
    return request(`password-reset/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data),
        }
    )
}

export const userDataUpdateRequest = async data => {
    return request(`auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: localStorage.getItem("accessToken")
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
export const refreshToken = () => {
    return request(`auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    })
}

export const fetchWithRefresh = async (url, options) => {
    try {
         return await request(`${url}`, options);
    } catch (err) {
        if (err.message === 'jwt expired') {
            console.log('JWT expired');
            const refreshData = await refreshToken();
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem('accessToken', refreshData.accessToken);
            options.headers.authorization = refreshData.accessToken;
            return await request(url, options);
        } else {
            return Promise.reject(err);
        }
    }
}
