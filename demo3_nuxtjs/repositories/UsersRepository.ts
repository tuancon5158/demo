import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { I_ResendConfirmRequest } from '~/types/schema/auth'
import { I_FollowSpace } from '~/types/schema/space'
import { I_UpdateEmailRequest, I_UpdatePassword } from '~/types/schema/update'
import { I_Account } from '~/types/schema/user'
import {
  I_Response_Type,
  I_User_Meta_Response,
  I_User_Info_Response,
  I_Confirm_Email_Response_Data,
  I_UserFollow2_Response_Data,
  I_UserFollow_Response_Data,
  I_IsFollow_Response_Data
} from '~/types/schema/response'

const resource = '/users'

export default ($axios: NuxtAxiosInstance) => ({
  getUserDetail(userId: string) {
    return $axios.$get<I_Response_Type<I_User_Meta_Response>>(`${resource}/${userId}`)
  },

  userAccount() {
    return $axios.$get<I_Response_Type<I_User_Info_Response>>(`${resource}/account`, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
  },

  updateAccount(inputData: I_Account) {
    return $axios.$patch<I_Response_Type<I_User_Info_Response>>(`${resource}/account`, {
      ...inputData
    })
  },

  /// cannot find type confirm
  confirmEmail(inputData: I_ResendConfirmRequest) {
    return $axios.$get<I_Response_Type<I_Confirm_Email_Response_Data>>(
      `${resource}/confirm/${inputData}/email`
    )
  },

  newPassword(inputData: I_UpdatePassword) {
    return $axios.patch<I_Response_Type<I_User_Meta_Response>>(`${resource}/new-password`, {
      ...inputData
    })
  },

  changePassword(inputData: I_UpdatePassword) {
    return $axios.$patch<I_Response_Type<I_User_Meta_Response>>(`${resource}/change-password`, {
      ...inputData
    })
  },

  deleteAccount() {
    return $axios.$delete<I_Response_Type<I_User_Info_Response>>(`${resource}/delete`)
  },

  follow(inputData: I_FollowSpace) {
    return $axios.$patch<I_Response_Type<I_UserFollow2_Response_Data>>(`${resource}/follow`, {
      ...inputData
    })
  },

  // getFollowing(userId: string) {
  //   return $axios.$get<I_Response_Type<I_UserFollow_Response_Data>>(
  //     `${resource}/${userId}/following`
  //   )
  // },

  // getFollowers(userId: string) {
  //   return $axios.$get<I_Response_Type<I_UserFollow_Response_Data>>(
  //     `${resource}/${userId}/followers`
  //   )
  // },

  // getIsFollower(userId: string) {
  //   return $axios.$get<I_Response_Type<I_IsFollow_Response_Data>>(
  //     `${resource}/${userId}/is-follower`
  //   )
  // },

  changeEmail(inputData: I_UpdateEmailRequest) {
    return $axios.$post<I_Response_Type<I_User_Info_Response>>(`${resource}/change-email`, {
      ...inputData
    })
  }
})
