import { ApiHelper } from '.'

const resourceAdmin = '/admin-roles'

export const roleServices = {
	// for admin
	reqAdmin(inputData: { email: string; rolesId: number }) {
		return ApiHelper.patch<any, { email: string; rolesId: number }>(
			`${resourceAdmin}`,
			{
				...inputData,
			}
		)
	},
}
