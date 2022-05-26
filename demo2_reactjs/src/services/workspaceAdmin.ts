import {
	IResponse,
	IGetResponseData,
	IPagination,
} from '../interfaces/response'
import { ApiHelper } from '.'
import { IPlan, IWorkspaceAdmin } from '../interfaces/workspaceAdmin'

const resource = '/admin-workspaces'
export interface IWorkspaceAdminParams {
	page?: number
	limit?: number
	sort?: string
	direction?: string
	title?: string
	status?: string
}

interface IRequestChangeStatus {
	id?: number
	status: number
	addStorage?: number
	addAccount?: number
}
export interface IGetResponseWSData<R> {
	pagination: IPagination
	workspaceList: R[]
}
// interface IRequestChangePlan {
// 	workspaceId?: string
// 	planId: number
// }
export const workspaceAdminServices = {
	getList(requestParams: IWorkspaceAdminParams) {
		return ApiHelper.get<IResponse<IGetResponseWSData<IWorkspaceAdmin>>>(
			`${resource}`,
			requestParams
		)
	},
	getDetail(id?: string) {
		return ApiHelper.get<IResponse<IWorkspaceAdmin>>(`${resource}/${id}`)
	},
	create(data: any) {
		return ApiHelper.post<IResponse<IWorkspaceAdmin>, IRequestChangeStatus>(
			`${resource}`,
			data
		)
	},
	update(data: IRequestChangeStatus) {
		return ApiHelper.patch<IResponse<IWorkspaceAdmin>, IRequestChangeStatus>(
			`${resource}`,
			data
		)
	},

	updateMaxAccount(data: { id: string | number; addAccount: number }) {
		return ApiHelper.patch<
			IResponse<IWorkspaceAdmin>,
			{ id: string | number; addAccount: number }
		>(`${resource}/account`, data)
	},
	updateStorage(data: { id: string | number; addStorage: number }) {
		return ApiHelper.patch<
			IResponse<IWorkspaceAdmin>,
			{ id: string | number; addStorage: number }
		>(`${resource}/storage`, data)
	},
	updateBasePrice(data: { id: string | number; discount: number }) {
		return ApiHelper.patch<
			IResponse<IWorkspaceAdmin>,
			{ id: string | number; discount: number }
		>(`${resource}/discount`, data)
	},
	updatePlan(data: { id: string | number; planId: number | string }) {
		return ApiHelper.patch<
			IResponse<IWorkspaceAdmin>,
			{ id: string | number; planId: number | string }
		>(`${resource}/plans`, data)
	},
	getPlans() {
		return ApiHelper.get<IResponse<IGetResponseData<IPlan>>>(`${resource}/plans`)
	},

	remove(newsId: number) {
		return ApiHelper.delete<IResponse<IGetResponseData<IWorkspaceAdmin>>>(
			`${resource}/${newsId}`
		)
	},
}
