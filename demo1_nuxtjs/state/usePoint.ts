import { ref, useFetch, watch } from '@nuxtjs/composition-api'
import { useServicePoint } from '@/services'
import { IPoint, IParamsPoint } from '@/interfaces/point'

export const useFetchPoints = (params: IParamsPoint) => {
  const { all } = useServicePoint()

  const points = ref<IPoint[]>([])

  const { fetch } = useFetch(async () => {
    try {
      points.value = []
      const { data } = await all(params)

      points.value = data
    } catch (e) {
      console.log({ e })
    }
  })

  watch(params, fetch)

  return { points, fetch }
}
