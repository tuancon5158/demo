import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { I_Response_Type, I_Get_Categories_Response_Data } from '~/types/schema/response'

const resource = '/categories'

export default ($axios: NuxtAxiosInstance) => ({
  get() {
    return $axios.$get<I_Response_Type<I_Get_Categories_Response_Data>>(`${resource}`)
  }
})
