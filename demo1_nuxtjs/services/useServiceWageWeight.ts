import { useResource } from '@/services'
import { IWageWeight } from '@/interfaces/wageWeight'

export const useServiceWageWeight = () => {
  const { all, add, edit, get } = useResource<IWageWeight>('wage-weights')

  return {
    all,
    add,
    edit,
    get,
  }
}
