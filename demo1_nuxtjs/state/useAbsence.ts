import { reactive, useFetch, useRoute } from '@nuxtjs/composition-api'
import dayjs from 'dayjs'
import { useAuth } from '@/composables'
import { useServiceAbsence } from '@/services'
import { IAbsenceForm } from '@/interfaces/absence'

export const useFetchDetailAbsence = () => {
  const route = useRoute()
  const id = Number(route.value.params.id)
  const { user } = useAuth()

  const formModel = reactive<IAbsenceForm>({
    user_id: user.id,
    id,
    time_blocks: [],
    reason: '',
    endDate: '',
    startDate: '',
    status: -1,
  })

  const { get } = useServiceAbsence()

  const { fetch, fetchState } = useFetch(async () => {
    const { data } = await get(id)

    formModel.time_blocks = data.time_blocks.map(item => item.id)
    formModel.reason = data.reason

    const dateRange = data.time_blocks
      .map(timeBlock => timeBlock.date_block.date)
      .sort((a, b) => dayjs(a).valueOf() - dayjs(b).valueOf())

    formModel.startDate = dateRange[0]
    formModel.endDate = dateRange[dateRange.length - 1]
    formModel.status = data.status
  })

  return { formModel, fetch, fetchState }
}
