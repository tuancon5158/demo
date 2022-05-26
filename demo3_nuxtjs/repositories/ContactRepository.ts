import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { I_ContactRequest } from '~/types/schema/contact'
import {
  I_Response_Type,
  I_Post_Contact_Response_Data
} from '~/types/schema/response'
const resource = '/contacts'

export default ($axios: NuxtAxiosInstance) => ({
  contactSend(inputData: I_ContactRequest) {
    return $axios.$post<I_Response_Type<I_Post_Contact_Response_Data>>(
      `${resource}`,
      {
        ...inputData
      }
    )
  }
})

/// test done
