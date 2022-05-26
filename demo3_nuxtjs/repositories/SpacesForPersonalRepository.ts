import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { I_SpaceListRequest } from '~/types/schema/space'
import {
  I_Response_Type,
  I_GetSpaces_Response_Data
} from '~/types/schema/response'

const resource = '/spaces-for-personal'

export default ($axios: NuxtAxiosInstance) => ({
  getList(requestParams: I_SpaceListRequest) {
    return $axios.$get<I_Response_Type<I_GetSpaces_Response_Data>>(
      `${resource}`,
      {
        params: requestParams
      }
    )
  }
})
