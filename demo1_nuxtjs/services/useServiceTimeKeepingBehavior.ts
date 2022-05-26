import { useContext } from '@nuxtjs/composition-api'
import { ITimeKeepingBehavior } from '@/interfaces/timeKeeping'

export const useServiceTimeKeepingBehavior = () => {
  const context = useContext()

  const all = () => {
    return context.$axios.$get<ITimeKeepingBehavior[]>(
      '/hrm/timekeeping/behaviors'
    )
  }

  return { all }
}
