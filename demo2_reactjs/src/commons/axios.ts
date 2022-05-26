/* eslint-disable */

import axios from 'axios'
import { authServices } from '../services/auth'
import eventBus from './EventBus'
import httpStatus from './httpStatus'
import key from './key'
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = "http://45.77.170.201:7999/api";
// axios.defaults.headers.common["Authorization"] = window.localStorage.getItem("jwt");
// axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
const CancelToken = axios.CancelToken
const source = CancelToken.source()
let config = {
	baseURL: process.env.REACT_APP_API_URL,
	validateStatus: (status: number) => {
		return (
			(status >= httpStatus.StatusOK &&
				status < httpStatus.StatusMultipleChoices) ||
			status === httpStatus.StatusBadRequest
		)
	},
	cancelToken: source.token,
	// timeout: 60 * 1000, // Timeout
	// withCredentials: true // Check cross-site Access-Control
}
const _axios = axios.create(config)
_axios.interceptors.request.use(
	(config: any) => {
		// Do something before request is sent
		config.headers[key.X_API_KEY] = process.env.REACT_APP_API_KEY
		config.headers[key.X_COMONY_API] = true
		if (window.localStorage.getItem(key.TOKEN))
			config.headers.authorization =
				`Bearer ${window.localStorage.getItem(key.TOKEN)}` || ''
		return config
	},
	error => {
		// Do something with request error
		return Promise.reject(error)
	}
)

// Add a response interceptor
_axios.interceptors.response.use(
	response => {
		// Do something with response data
		return response
	},
	async error => {
		const originalRequest = error.config
		if (error.response.status === 401 && !originalRequest._retry) {
			// not use localStorage.clear()
			localStorage.removeItem(key.TOKEN)
			eventBus.dispatch('logout')
		}

		// _axios(originalRequest)
		// Do something with response error
		return Promise.reject(error.response)
	}
)

export default _axios
