import { useResource } from '@/services'
import { IRevenueConversion } from '@/interfaces/revenueConversion'

export const useServiceRevenueConversion = () => {
  const { all, add, edit, get } =
    useResource<IRevenueConversion>('revenue-converts')

  return {
    all,
    add,
    edit,
    get,
  }
}
