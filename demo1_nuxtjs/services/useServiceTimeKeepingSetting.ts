import { useContext } from '@nuxtjs/composition-api'
import { ITimeKeepingSetting } from '@/interfaces/timeKeeping'

export const useServiceTimeKeepingSetting = () => {
  const context = useContext()

  const all = () => {
    return context.$axios.$get<ITimeKeepingSetting[]>(
      'hrm/timekeeping/settings'
    )
  }

  const update = (params: ITimeKeepingSetting[]) => {
    return context.$axios.$put<ITimeKeepingSetting[]>(
      'hrm/timekeeping/settings',
      params
    )
  }

  return { all, update }
}
