export function validateUser(user, setUser) {
    if (!user && localStorage.user) {
        return setUser({ ...JSON.parse(localStorage.user) }); //recuperar dados do localStorage
    }
}

export function validateIdUser(idUser, setIdUser) {
    if (!idUser && localStorage.idUser) {
        return setIdUser({ ...JSON.parse(localStorage.idUser) }); //recuperar dados do localStorage
    }
}