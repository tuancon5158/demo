import { NuxtAxiosInstance } from '@nuxtjs/axios'

import {
  I_Register_Space_Issues_Response_Data,
  I_Response_Type,
  I_Get_Members_Response_Data,
  I_Patch_Members_Response_Data,
  I_Delete_Members_Response_Data,
  I_Post_Members_Invite_Response_Data
} from '~/types/schema/response'
import {
  I_MemberPersonal,
  I_Members_Request,
  I_Patch_Members_Request,
  I_Post_Members_Invite_Request,
  I_Patch_Members_Notification_Request
} from '~/types/schema/members'

const resource = '/members'

export default ($axios: NuxtAxiosInstance) => ({
  memberPersonal(requestParams: I_MemberPersonal) {
    return $axios.$patch<I_Response_Type<I_Register_Space_Issues_Response_Data>>(
      `${resource}/personal`,
      requestParams
    )
  },

  getList(requestParams: I_Members_Request) {
    return $axios.$get<I_Response_Type<I_Get_Members_Response_Data>>(`${resource}`, {
      params: requestParams
    })
  },

  getListNotice(requestParams: I_Members_Request) {
    return $axios.$get<I_Response_Type<I_Get_Members_Response_Data>>(`${resource}/notice`, {
      params: requestParams
    })
  },

  getMemberMe(workspaceId: number) {
    return $axios.$get<I_Response_Type<I_Get_Members_Response_Data>>(`${resource}/me`, {
      params: {
        workspaceId
      }
    })
  },

  patchMemberNotification(inputData: I_Patch_Members_Notification_Request) {
    return $axios.$patch<I_Response_Type<I_Patch_Members_Response_Data>>(
      `${resource}/notice`,
      inputData
    )
  },

  patchMember(inputData: I_Patch_Members_Request[]) {
    return $axios.$patch<I_Response_Type<I_Patch_Members_Response_Data>>(`${resource}`, inputData)
  },

  deleteMember(userId: number) {
    return $axios.$delete<I_Response_Type<I_Delete_Members_Response_Data>>(`${resource}/${userId}`)
  },

  postMemberInvite(inputData: I_Post_Members_Invite_Request) {
    return $axios.$post<I_Response_Type<I_Post_Members_Invite_Response_Data>>(
      `${resource}/invite`,
      {
        ...inputData
      }
    )
  }
})
