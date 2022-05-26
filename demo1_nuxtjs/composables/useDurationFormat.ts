import { IIncomeAmountNew } from '@/interfaces/incomeAmountDetail'
import { E_Duration } from '@/enums/incomeAmount'

export const useDurationFormat = (item: IIncomeAmountNew) => {
  if (item.duration === E_Duration.Month) {
    return `Tháng ${item.month}/${item.year}`
  }

  if (item.duration === E_Duration.Quarter) {
    return `Quý ${item.quarter}/${item.year}`
  }

  return `Năm ${item.year}`
}
