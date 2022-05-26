import { onBeforeMount, ref } from '@nuxtjs/composition-api'
import { useServiceIncomeAmountDetail } from '@/services'

import { IAmountType } from '@/interfaces/incomeAmount'

export const types = ref<IAmountType[]>([])

export const useIncomeAmountDetailType = () => {
  const { getTypes } = useServiceIncomeAmountDetail()

  const fetch = async () => {
    try {
      const { data } = await getTypes()

      types.value = data
    } catch (e) {
      console.log({ e })
    }
  }

  onBeforeMount(async () => {
    if (types.value.length) return

    await fetch()
  })

  return { types, fetch }
}
