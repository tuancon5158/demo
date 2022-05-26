import { getCurrentInstance } from '@nuxtjs/composition-api'

// expose public api
export const useExpose = (apis: Record<string, any>) => {
  const instance = getCurrentInstance()

  if (instance) {
    Object.assign(instance.proxy, apis)
  }
}
