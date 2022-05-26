import { useContext } from '@nuxtjs/composition-api'
import { IResponse } from '@/interfaces/resource'
import { IBranch } from '@/interfaces/branch'

export const useServiceBranch = () => {
  const context = useContext()

  const all = () => {
    return context.$axios.$get<IResponse<IBranch[]>>('cms/branch/getAll')
  }

  return {
    all,
  }
}
