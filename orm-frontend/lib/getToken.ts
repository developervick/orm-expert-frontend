
const getToken = () => {
    return localStorage.getItem('token')
}

const getRefreshToken = () => {
    return localStorage.getItem('refresh_token')
}

export {getToken, getRefreshToken}