import { ApiHelper } from '.'
import {
	IResponseType,
	IUserInfoResponse,
	IUserMetaResponse,
} from '../interfaces/response'

const resource = '/users'
const resourceAdmin = '/admin-users'

export const userServices = {
	// for admin
	getList(requestParams?: {}) {
		return ApiHelper.get<IResponseType<any>>(`${resourceAdmin}`, requestParams)
	},

	getUserDetail(userId: string) {
		return ApiHelper.get<IResponseType<IUserMetaResponse>>(
			`${resource}/${userId}`
		)
	},

	userAccount() {
		return ApiHelper.get<IResponseType<IUserInfoResponse>>(
			`${resource}/account`,
			{
				headers: {
					'Cache-Control': 'no-cache',
				},
			}
		)
	},
}
