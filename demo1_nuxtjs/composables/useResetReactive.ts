import { reactive } from '@nuxtjs/composition-api'
import { cloneDeep } from '@/utils'

export const useResetReactive = <T extends object>(defaultValue: T) => {
  const state = reactive(cloneDeep(defaultValue))

  const reset = () => {
    Object.assign(state, defaultValue)
  }

  return { state, reset }
}
