import { IResponse, IGetResponseData } from '../interfaces/response'
import { ApiHelper } from '.'
import { IWorkspace } from '../interfaces/workspace'

const resource = '/admin-workspaces/contact'
export interface IWorkspaceParams {
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

interface IRequestChangePlan {
	id?: string
	planId: number
}
export const workspaceServices = {
	getList(requestParams: IWorkspaceParams) {
		return ApiHelper.get<IResponse<IGetResponseData<IWorkspace>>>(
			`${resource}`,
			requestParams
		)
	},
	getDetail(id?: string) {
		return ApiHelper.get<IResponse<IWorkspace>>(`${resource}/${id}`)
	},
	create(data: any) {
		return ApiHelper.post<IResponse<IWorkspace>, IRequestChangeStatus>(
			`${resource}`,
			data
		)
	},
	update(data: IRequestChangeStatus) {
		return ApiHelper.patch<IResponse<IWorkspace>, IRequestChangeStatus>(
			`${resource}`,
			data
		)
	},

	updatePlan(data: IRequestChangePlan) {
		return ApiHelper.patch<IResponse<IWorkspace>, IRequestChangePlan>(
			`/admin-workspaces/plans`,
			data
		)
	},
	getDetailPlan(idPlan?: string) {
		return ApiHelper.get<IResponse<IGetResponseData<IWorkspace>>>(
			`plan/info?workspaceId=${idPlan}`
		)
	},

	remove(newsId: number) {
		return ApiHelper.delete<IResponse<IGetResponseData<IWorkspace>>>(
			`${resource}/${newsId}`
		)
	},
}
