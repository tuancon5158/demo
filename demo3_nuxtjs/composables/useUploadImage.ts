import { ref, useContext } from '@nuxtjs/composition-api'
import { I_Response_Type, I_File_Response_Data } from '~/types/schema/response'
interface I_ParamRequest {
  [key: string]: string
}

// modify $config type later

export const useUploadImage = (key: string, formValues: I_ParamRequest, $config: any) => {
  const { app } = useContext()
  const isLoading = ref(false)
  const currentProgress = ref(0)

  const convertFullPath = (imageKey: string): string => {
    return `${$config.frontURL}/${imageKey}`
  }

  const handleSelectImage = async (
    fileData: any,
    key: string,
    prefix: string,
    id: string
  ): Promise<void> => {
    isLoading.value = true
    await fileUpload(fileData, prefix, id)
  }

  const handleDeleteImage = (): void => {
    formValues[key] = ''
  }

  /**
   * add prefix
   * space image upload: prefix: 'spaces'
   * workspace image upload: prefix: 'workspaces', id: 'workspaceID'
   * user image upload: prefix: 'users', id: 'userID'
   **/
  const fileUpload = async (fileData: any, prefix: string, id: string): Promise<void> => {
    const formData = new FormData()

    formData.append('file', fileData)
    if (prefix) formData.append('prefix', prefix)
    if (prefix && id) formData.append('id', id)

    await app
      .$repository('file')
      .upload(formData, (progressEvent: { loaded: number; total: number }) => {
        const { loaded, total } = progressEvent
        const progressPercent = Math.round((loaded * 100) / total)

        currentProgress.value = progressPercent

        return progressPercent
      })
      .then((response: I_Response_Type<I_File_Response_Data>) => {
        formValues[key] = response.data.key ?? ''
      })
      .catch(() => {})
      .finally(() => {
        isLoading.value = false
        currentProgress.value = 0
      })
  }

  return {
    isLoading,
    currentProgress,
    convertFullPath,
    handleSelectImage,
    handleDeleteImage
  }
}
