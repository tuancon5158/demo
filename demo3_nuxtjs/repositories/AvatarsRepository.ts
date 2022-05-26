import { NuxtAxiosInstance } from '@nuxtjs/axios'
const resource = '/avatars'

// avatar didnt use in any part ?
export default ($axios: NuxtAxiosInstance) => ({
  getList(requestParams) {
    return $axios.$get(`${resource}`, {
      params: requestParams
    })
  }
})
