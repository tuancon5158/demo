import { ApiHelper } from '.'
import { ILoginRequest } from '../interfaces/auth'
import { IResponseType, ILoginResponseData } from '../interfaces/response'

const resource = '/auth'

export const authServices = {
	login(inputData: ILoginRequest) {
		return ApiHelper.post<IResponseType<ILoginResponseData>, ILoginRequest>(
			`${resource}/login`,
			{
				...inputData,
			}
		)
	},

	logout() {
		return ApiHelper.post(`${resource}/logout`)
	},

	refreshToken(refreshToken: string) {
		return ApiHelper.get(`${resource}/${refreshToken}/refresh-token`)
	},
}
