import { useResource } from '@/services'
import { IWageScale } from '@/interfaces/wageScale'

export const useServiceWageScale = () => {
  const { all, add, edit, get } = useResource<IWageScale>('wage-scales')

  return {
    all,
    add,
    edit,
    get,
  }
}
