import { ref, useFetch, watch } from '@nuxtjs/composition-api'
import { useServiceIncomeAmount } from '@/services'
import { IIncomeAmount, IParamsIncomeAmount } from '@/interfaces/incomeAmount'

export const useFetchIncomeAmounts = (params: IParamsIncomeAmount) => {
  const { all } = useServiceIncomeAmount()

  const incomeAmounts = ref<IIncomeAmount[]>([])
  const total = ref(0)

  const { fetch } = useFetch(async () => {
    try {
      const { data, meta } = await all(params)

      incomeAmounts.value = data
      total.value = meta.total
    } catch (e) {
      console.log({ e })
    }
  })

  watch(params, fetch)

  return { incomeAmounts, total, fetch }
}
