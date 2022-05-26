import { useResource } from '@/services'
import { IIncomeAmount } from '@/interfaces/incomeAmount'

export const useServiceIncomeAmount = () => {
  const { all } = useResource<IIncomeAmount>('income-amounts')

  return { all }
}
