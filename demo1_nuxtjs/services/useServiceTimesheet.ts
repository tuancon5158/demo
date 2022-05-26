import { useResource } from '@/services'
import { ITimesheet } from '@/interfaces/timesheet'

export const useServiceTimesheet = () => {
  const { all, add, edit, get } = useResource<ITimesheet>('time-sheets')

  return {
    all,
    add,
    edit,
    get,
  }
}
