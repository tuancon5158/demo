import key from '../commons/key'

const setToken = (token: string) => {
	localStorage.setItem(key.TOKEN, token)
}

const removeToken = () => {
	localStorage.removeItem(key.TOKEN)
}

const TokenService = {
	setToken,
	removeToken,
}

export default TokenService
