import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { I_Get_Info_Plan_Response_Data, I_Response_Type } from '~/types/schema/response'
const resource = '/plan'

export default ($axios: NuxtAxiosInstance) => ({
  // [GET] get workspace list of user
  getInfoPlan(requestParams) {
    return $axios.$get<I_Response_Type<I_Get_Info_Plan_Response_Data>>(`${resource}/info`, {
      params: requestParams
    })
  }
})
