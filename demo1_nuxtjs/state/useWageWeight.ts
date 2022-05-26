import { onBeforeMount, ref } from '@nuxtjs/composition-api'
import { useServiceWageWeight } from '@/services'
import { IWageWeight } from '@/interfaces/wageWeight'

export const wageWeights = ref<IWageWeight[]>([])

export const useWageWeights = () => {
  const { all } = useServiceWageWeight()

  const fetch = async () => {
    try {
      const { data } = await all({})

      wageWeights.value = data.filter(item => item.status !== 0)
    } catch (e) {
      console.log({ e })
    }
  }

  const findWageWeight = (id: number) => {
    return wageWeights.value.find(wageWeight => wageWeight.id === id)
  }

  onBeforeMount(async () => {
    if (wageWeights.value.length) return

    await fetch()
  })

  return { wageWeights, fetch, findWageWeight }
}
