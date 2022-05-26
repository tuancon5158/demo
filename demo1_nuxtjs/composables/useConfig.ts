import { useContext } from '@nuxtjs/composition-api'

export const useConfig = () => {
  const context = useContext()

  return context.app.$config
}
