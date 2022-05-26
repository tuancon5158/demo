import {
	IResponseType,
	IGetNewsIdResponseData,
	IResponse,
	IGetResponseData,
} from '../interfaces/response'
import { ApiHelper } from '.'
import { ISpace } from '../interfaces/space'

const resource = '/admin-spaces'
export interface ISpaceParams {
	page?: number
	limit?: number
	sort?: string
	direction?: string
	title?: string
	status?: string
}

export interface IRequestUpdateKey {
	id: string | number
	isKey: number
}
export interface IRequestRecommend {
	id: string | number
	isRecommended: number
}
export interface IRequestPublicStatus {
	id: string | number
	publishedStatus: number
}

export const spaceServices = {
	getList(requestParams: ISpaceParams) {
		return ApiHelper.get<IResponse<IGetResponseData<ISpace>>>(
			`${resource}`,
			requestParams
		)
	},
	getDetail(id?: string) {
		return ApiHelper.get<IResponse<ISpace>>(`${resource}/${id}`)
	},

	updateKey(data: IRequestUpdateKey) {
		return ApiHelper.patch<IResponse<ISpace>, IRequestUpdateKey>(
			`${resource}/key`,
			data
		)
	},
	updateRecommend(data: IRequestRecommend) {
		return ApiHelper.patch<IResponse<ISpace>, IRequestRecommend>(
			`${resource}/recommend`,
			data
		)
	},
	updatePublicStatus(data: IRequestPublicStatus) {
		return ApiHelper.patch<IResponse<ISpace>, IRequestPublicStatus>(
			`${resource}/published-status`,
			data
		)
	},
	remove(newsId: number) {
		return ApiHelper.delete<IResponseType<IGetNewsIdResponseData>>(
			`${resource}/${newsId}`
		)
	},
}
