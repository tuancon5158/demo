import { useResource } from '@/services'
import { IHoliday } from '@/interfaces/holiday'

export const useServiceHoliday = () => {
  const { all, add, edit, get } = useResource<IHoliday>('holidays')

  return {
    all,
    add,
    edit,
    get,
  }
}
