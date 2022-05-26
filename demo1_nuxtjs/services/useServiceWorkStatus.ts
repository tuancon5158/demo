import { useContext } from '@nuxtjs/composition-api'
import { IResponse } from '@/interfaces/resource'
import { IWorkStatus } from '@/interfaces/workStatus'

export const useServiceWorkStatus = () => {
  const context = useContext()

  const all = () => {
    return context.$axios.$get<IResponse<IWorkStatus[]>>('hrm/work-status/all')
  }

  return { all }
}
