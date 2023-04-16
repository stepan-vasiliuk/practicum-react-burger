const baseUrl = 'https://norma.nomoreparties.space/api';
export const registerRequest = async data => {
    return await fetch(`${baseUrl}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }
    )
}

export const loginRequest = async data => {
    const res = await fetch(`${baseUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }
    )
    return await checkResponse(res);
}

export const passwordResetRequest = async email => {
    const res = await fetch(`${baseUrl}/password-reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(email),
        }
    )
    return await checkResponse(res);
}

export const passwordRecoveryRequest = async data => {
    const res = await fetch(`${baseUrl}/password-reset/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data),
        }
    )
    return await checkResponse(res);
}

export const userDataUpdateRequest = async data => {
    const res = await fetch(`${baseUrl}/auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: localStorage.getItem("accessToken")
        },
        body: JSON.stringify(data),

    })
    return await checkResponse(res);
}

export const logOutRequest = async () => {
    const res = await fetch(`${baseUrl}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    })
    return await checkResponse(res);
}


const checkResponse = res => {
    return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
}

export const refreshToken = () => {
    return fetch(`${baseUrl}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    }).then(checkResponse);
}

export const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err) {
        if (err.message === 'jwt expired') {
            console.log('JWT expired');
            const refreshData = await refreshToken();
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem('accessToken', refreshData.accessToken);
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options);
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
}
