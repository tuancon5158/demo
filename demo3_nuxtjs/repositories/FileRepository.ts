import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { I_Response_Type, I_File_Response_Data } from '~/types/schema/response'
const resource = '/file'

export default ($axios: NuxtAxiosInstance) => ({
  upload(formData: FormData, handleUploadProgress = () => {}) {
    return $axios.$post<I_Response_Type<I_File_Response_Data>>(`${resource}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: handleUploadProgress
    })
  }
})
