import { onBeforeMount, ref } from '@nuxtjs/composition-api'
import { useServiceWageScale } from '@/services'
import { IWageScale } from '@/interfaces/wageScale'

export const wageScales = ref<IWageScale[]>([])

export const useWageScales = () => {
  const { all } = useServiceWageScale()

  const fetch = async () => {
    try {
      const { data } = await all({})

      wageScales.value = data
    } catch (e) {
      console.log({ e })
    }
  }

  const findWageScale = (id: number) => {
    return wageScales.value.find(wageScale => wageScale.id === id)
  }

  onBeforeMount(async () => {
    if (wageScales.value.length) return

    await fetch()
  })

  return { wageScales, fetch, findWageScale }
}
