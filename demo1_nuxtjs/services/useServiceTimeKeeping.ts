import { useContext } from '@nuxtjs/composition-api'
import { IResponse } from '@/interfaces/resource'
import { ITimeKeeping, ITimeKeepingParams } from '@/interfaces/timeKeeping'

export const useServiceTimeKeeping = () => {
  const context = useContext()

  const resource = 'timekeeping'

  const all = (params: ITimeKeepingParams) => {
    return context.$axios.$post<IResponse<ITimeKeeping[]>>(
      `hrm/${resource}`,
      params
    )
  }

  const update = (timekeepingId: number, params: { behavior_code: string }) => {
    return context.$axios.$put<IResponse<ITimeKeeping[]>>(
      `/hrm/timekeeping/update/${timekeepingId}`,
      params
    )
  }

  return { all, update }
}
