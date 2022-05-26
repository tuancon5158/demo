import { ref, useFetch, watch } from '@nuxtjs/composition-api'
import { useServiceIncomeAmountDetail } from '@/services'
import { IIncomeAmountNew } from '@/interfaces/incomeAmountDetail'
import { IParamsIncomeAmount } from '@/interfaces/incomeAmount'

export const useFetchIncomeAmountDetail = (params: IParamsIncomeAmount) => {
  const { all } = useServiceIncomeAmountDetail()

  const incomeAmounts = ref<IIncomeAmountNew[]>([])
  const total = ref(0)
  const totalAdditionalAmount = ref(0)
  const totalApprovedAmount = ref(0)

  const { fetch } = useFetch(async () => {
    try {
      const { data } = await all(params)

      incomeAmounts.value = data.amounts
      total.value = data.meta_data.total
      totalAdditionalAmount.value = data.meta_data.total_additional_amount
      totalApprovedAmount.value = data.meta_data.total_approved_amount
    } catch (e) {
      console.log({ e })
    }
  })

  watch(params, fetch)

  return {
    incomeAmounts,
    total,
    totalAdditionalAmount,
    totalApprovedAmount,
    fetch,
  }
}

export const useStatusIncomeAmountDetail = () => {
  const statusList = [
    // status = 0, mà ở mốc thời gian khác mốc thời gian hiện tại -> chờ duyệt
    { value: 0, label: 'Đang thực hiện', classes: 'badge-blue' },
    { value: 1, label: 'Đã duyệt', classes: 'badge-green' },
    { value: 2, label: 'Sẵn sàng thanh toán', classes: 'badge-warning' },
    { value: 3, label: 'Bị huỷ', classes: 'badge-error' },
  ]

  const getStatus = (value: number) => {
    return statusList.find(item => item.value === value)
  }

  const getStatusLabel = (value: number) => {
    const status = getStatus(value)

    return status?.label || ''
  }

  return { statusList, getStatus, getStatusLabel }
}
