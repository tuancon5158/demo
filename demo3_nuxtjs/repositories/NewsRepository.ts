import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { I_NewsList } from '~/types/schema/news'
import {
  I_Response_Type,
  I_Get_News_Response_Data,
  I_Get_News_Id_Response_Data
} from '~/types/schema/response'

const resource = '/news'

export default ($axios: NuxtAxiosInstance) => ({
  getList(requestParams: I_NewsList) {
    return $axios.$get<I_Response_Type<I_Get_News_Response_Data>>(`${resource}`, {
      params: requestParams
    })
  },

  getDetail(newsId: number) {
    return $axios.$get<I_Response_Type<I_Get_News_Id_Response_Data>>(`${resource}/${newsId}`)
  }
})
