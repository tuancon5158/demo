import { INewsList } from '../interfaces/news'
import {
	IResponseType,
	IGetNewsResponseData,
	IGetNewsIdResponseData,
} from '../interfaces/response'
import { ApiHelper } from '.'

const resource = '/news'

export const newsServices = {
	getList(requestParams: INewsList) {
		return ApiHelper.get<IResponseType<IGetNewsResponseData>>(
			`${resource}/admin`,
			requestParams
		)
	},

	getDetail(newsId?: string) {
		return ApiHelper.get<IResponseType<IGetNewsIdResponseData>>(
			`${resource}/${newsId}`
		)
	},

	create(data: any) {
		return ApiHelper.post<IResponseType<IGetNewsIdResponseData>, any>(
			`${resource}/admin`,
			data
		)
	},

	update(data: any) {
		return ApiHelper.patch<IResponseType<IGetNewsIdResponseData>, any>(
			`${resource}/admin`,
			data
		)
	},

	remove(newsId: number) {
		return ApiHelper.delete<IResponseType<IGetNewsIdResponseData>>(
			`${resource}/admin/${newsId}`
		)
	},
}
