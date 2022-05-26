import { useContext } from '@nuxtjs/composition-api'
import { useConfig } from '@/composables'

export const useServiceUpload = () => {
  const config = useConfig()
  const context = useContext()

  const upload = (params: FormData) => {
    return context.$axios.$post('upload', params, {
      baseURL: config.mediaBaseURL,
    })
  }

  return { upload }
}
