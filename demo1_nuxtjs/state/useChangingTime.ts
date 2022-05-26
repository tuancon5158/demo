import { ref } from '@nuxtjs/composition-api'
import { useTimeBlocks } from '@/composables'
import { useServiceChangingTime } from '@/services'
import { IChangingTime, IParamsChangingTime } from '@/interfaces/changingTime'

export const useFetchChangingTime = (params: IParamsChangingTime) => {
  const { all } = useServiceChangingTime()
  const { getTotalTime } = useTimeBlocks()

  const changingTimes = ref<IChangingTime[]>([])
  const total = ref(0)

  const loadData = async () => {
    try {
      const { data, meta } = await all(params)

      changingTimes.value = data.map(item => {
        if (item.model_name === 'OT') {
          item.totalTime = item.period[1] - item.period[0]
        } else {
          item.totalTime = getTotalTime(item.time_blocks)
        }

        return item
      })
      total.value = meta.total
    } catch (e) {
      console.log({ e })
    }
  }

  return { changingTimes, total, loadData }
}
