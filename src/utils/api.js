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