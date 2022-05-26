import { E_Duration } from '@/enums/incomeAmount'

export const useIncomeAmountAccount = () => {
  const incomeAmountAccount = [
    { label: 'Tháng', value: E_Duration.Month },
    { label: 'Quý', value: E_Duration.Quarter },
    { label: 'Năm', value: E_Duration.Year },
  ]

  return { incomeAmountAccount }
}
