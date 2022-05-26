import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { I_Space, I_SpaceListRequest } from '~/types/schema/space'
import {
  I_Response_Type,
  I_GetSpaces_Response_Data,
  I_Space_Response_Data_Details,
  I_Space_Affected_Response_Data,
  I_Space_Instance_Response_Data
} from '~/types/schema/response'

const resource = '/spaces'

export default ($axios: NuxtAxiosInstance) => ({
  getList(requestParams: I_SpaceListRequest) {
    return $axios.$get<I_Response_Type<I_GetSpaces_Response_Data>>(
      `${resource}`,
      {
        params: requestParams
      }
    )
  },

  getDetail(spaceId: number) {
    return $axios.$get<I_Response_Type<I_Space_Response_Data_Details>>(
      `${resource}/${spaceId}`
    )
  },

  add(inputData: I_Space) {
    return $axios.$post<I_Response_Type<I_Space_Response_Data_Details>>(
      `${resource}`,
      {
        ...inputData
      }
    )
  },

  edit(inputData: I_Space) {
    return $axios.$patch<I_Response_Type<I_Space_Response_Data_Details>>(
      `${resource}`,
      {
        ...inputData
      }
    )
  },

  editPublishedStatus(inputData: I_Space) {
    return $axios.$patch<I_Response_Type<I_Space_Response_Data_Details>>(
      `${resource}/published-status`,
      {
        ...inputData
      }
    )
  },

  remove(spaceId: number) {
    return $axios.$delete<I_Response_Type<I_Space_Response_Data_Details>>(
      `${resource}/${spaceId}`
    )
  },

  addViewer(spaceId: string) {
    return $axios.$patch<I_Response_Type<I_Space_Affected_Response_Data>>(
      `${resource}/${spaceId}/viewer`,
      {
        id: spaceId
      }
    )
  },

  instance(spaceId: string) {
    return $axios.$post<I_Response_Type<I_Space_Instance_Response_Data>>(
      `${resource}/instance`,
      {
        id: spaceId
      }
    )
  }

  // addFavorite(spaceId: string) {
  //   return $axios.$patch(`${resource}-favorites`, {
  //     spaceId: spaceId
  //   })
  // }
})
