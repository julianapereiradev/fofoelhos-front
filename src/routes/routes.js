export const pages = {
    signIn: '/login',
    signUp: '/cadastro',
    home: '/home',
    getStarted: '/',
    bunnyId: '/coelho/',
    formPage: '/formulario',
    myBunnies: '/meus-coelhos',
    updateBunny: '/atualizar-coelho/'
}

const API_URL = 'http://localhost:5000';
// const API_URL = `${process.env.REACT_APP_API_URL}`

export const requisitions = {
    postSignUp: API_URL + '/signup',
    postSignIn: API_URL + '/signin',
    getBunnies: API_URL + '/home',
    postBunny: API_URL + '/postBunny',
    getBunny: API_URL + '/bunny/',
    getTables: API_URL + '/getTables',
    getMyBunnies: API_URL + '/myBunnies'
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