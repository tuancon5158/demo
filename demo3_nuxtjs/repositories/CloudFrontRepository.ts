import { NuxtAxiosInstance } from '@nuxtjs/axios'
const resource = '/cloudfront'

export default ($axios: NuxtAxiosInstance) => ({
  clearPageCache(distributionId: string, urlPath: string[]) {
    return $axios.$post(`${resource}`, {
      path: urlPath,
      distributionId
    })
  }
})
