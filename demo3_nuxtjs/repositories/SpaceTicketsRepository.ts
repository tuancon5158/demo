import { NuxtAxiosInstance } from '@nuxtjs/axios'
import {
  I_Response_Type,
  I_Get_SpaceTickets_CheckUser_Response_Data
} from '~/types/schema/response'
import { I_SpaceTickets_CheckUser_Get_Request } from '~/types/schema/tickets'

const resource = '/space-tickets'

export default ($axios: NuxtAxiosInstance) => ({
  // [GET] check ticket author or not
  checkAuthor(requestParams: I_SpaceTickets_CheckUser_Get_Request) {
    return $axios.$get<I_Response_Type<I_Get_SpaceTickets_CheckUser_Response_Data>>(
      `${resource}/check-user?spaceId=${requestParams}`
    )
  }
})
