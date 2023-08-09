export const pages = {
    signIn: '/login',
    signUp: '/cadastro',
    home: '/home',
    getStarted: '/',
    bunnyId: '/bunny'
}

const API_URL = 'http://localhost:5000';
// const API_URL = `${process.env.REACT_APP_API_URL}`

export const requisitions = {
    postSignUp: API_URL + '/signup',
    postSignIn: API_URL + '/signin',
    getBunnies: API_URL + '/home'
}

export function headersAuth(token) {
    if (!token && localStorage.user) {
        const user = JSON.parse(localStorage.user);
        token = user.token;
    }

    return {headers: {
        'Authorization': `Bearer ${token}`
    }}
}