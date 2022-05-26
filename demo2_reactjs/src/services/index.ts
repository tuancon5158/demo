/* eslint-disable */

import _axios from '../commons/axios'
import httpStatus from '../commons/httpStatus'
class HttpClientHelper {
	async get<T>(path: string, options?: any) {
		try {
			let convertParams: { [key: string]: string | number } = {}
			for (const key in options) {
				if (options[key]) {
					convertParams[key] = options[key]
				}
			}
			const response = await _axios.get<T>(path, {
				params: convertParams,
			})
			return response.data
		} catch (ex) {
			handleError(ex)
			return {} as T
		}
	}

	async post<T, U>(path: string, payload?: U) {
		try {
			const data = await _axios.post<T>(path, payload)
			return data
			// return data
		} catch (ex) {
			handleError(ex)
			return {} as T
		}
	}

	async put<T, U>(path: string, payload?: U) {
		try {
			const { data } = await _axios.put<T>(path, payload)
			return data
		} catch (ex) {
			handleError(ex)
			return {} as T
		}
	}

	async patch<T, U>(path: string, payload: U) {
		return _axios.patch<T>(path, payload)
	}

	async delete<T, U = {}>(path: string, payload?: U) {
		try {
			const { data } = await _axios.delete<T>(path, { data: payload })
			return data
		} catch (ex) {
			handleError(ex)
			return {} as T
		}
	}
}

function handleError(error: any) {
	if (error && error.status === httpStatus.StatusNotFound) return
	const action =
		error && error.status === httpStatus.StatusUnauthorized ? `` : ''
	const msg = error && error.data ? error.data.message : 'Can not connect server'
	throw new Error(error)
}

export const ApiHelper = new HttpClientHelper()
