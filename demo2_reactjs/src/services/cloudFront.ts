import { ApiHelper } from '.'

const resource = '/cloudFront'

export const cloudFrontServices = {
	clearCache(distributionId: string, urlPath: string[]) {
		return ApiHelper.post(`${resource}`, {
			path: urlPath,
			distributionId,
		})
	},
}
