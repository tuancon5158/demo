import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { I_LoginRequest, I_RegisterRequest, I_RegisterConfirmCode } from '~/types/schema/auth'
import {
  I_Response_Type,
  I_Login_Response_Data,
  I_Register_Response_Data,
  I_Confirm_Login_Response_Data
} from '~/types/schema/response'

const resource = '/auth'

export default ($axios: NuxtAxiosInstance) => ({
  login(inputData: I_LoginRequest) {
    return $axios.$post<I_Response_Type<I_Login_Response_Data>>(`${resource}/login`, {
      ...inputData
    })
  },

  socialLogin(token: string) {
    return $axios.$post(`${resource}/social-login`, '', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },

  logout() {
    return $axios.$post(`${resource}/logout`)
  },

  register(inputData: I_RegisterRequest) {
    return $axios.$post<I_Response_Type<I_Register_Response_Data>>(`${resource}/register`, {
      ...inputData
    })
  },

  confirmCode(inputData: I_RegisterConfirmCode) {
    return $axios.$post<I_Response_Type<I_Confirm_Login_Response_Data>>(`${resource}/confirm`, {
      ...inputData
    })
  }
})
