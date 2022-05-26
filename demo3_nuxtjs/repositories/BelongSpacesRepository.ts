import { NuxtAxiosInstance } from '@nuxtjs/axios'
import {
  I_Space_Response_Data_Details,
  I_Response_Type
} from '~/types/schema/response'
import { I_Space } from '~/types/schema/space'
const resource = '/belong-spaces'

export default ($axios: NuxtAxiosInstance) => ({
  // [GET] get spaces list of workspace
  getBelongSpaces(requestParams) {
    return $axios.$get(`${resource}`, {
      params: requestParams
    })
  },

  // [POST] post space to belong workspace
  createBelongSpaces(inputData: I_Space) {
    return $axios.$post<I_Response_Type<I_Space_Response_Data_Details>>(
      `${resource}`,
      {
        ...inputData
      }
    )
  },

  // [GET] get space detail
  getBelongSpaceDetail(spaceId: string) {
    return $axios.$get<I_Response_Type<I_Space_Response_Data_Details>>(
      `${resource}/${spaceId}`
    )
  },

  // [PATCH] edit space detail
  editBelongSpaceDetail(inputData: I_Space) {
    return $axios.$patch<I_Response_Type<I_Space_Response_Data_Details>>(
      `${resource}`,
      {
        ...inputData
      }
    )
  },

  instanceBelongSpaces(requestParams) {
    return $axios.$post(`${resource}/instance`, {
      ...requestParams
    })
  },

  deleteBelongSpaces(id: number) {
    return $axios.$delete(`${resource}/${id}`)
  }
})
