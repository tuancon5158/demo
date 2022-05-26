import { NuxtAxiosInstance } from '@nuxtjs/axios'
import {
  I_Response_Type,
  I_Get_Tags_Response_Data
} from '~/types/schema/response'

const resource = '/tags'

export default ($axios: NuxtAxiosInstance) => ({
  get() {
    return $axios.$get<I_Response_Type<I_Get_Tags_Response_Data>>(`${resource}`)
  }
})
