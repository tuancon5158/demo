import { reactive, ref, useFetch, useRoute } from '@nuxtjs/composition-api'
import { useAuth } from '@/composables'
import { useServiceOvertime } from '@/services'
import { IOvertimeForm } from '@/interfaces/overtime'

export const useFetchDetailOvertime = () => {
  const route = useRoute()
  const id = Number(route.value.params.id)
  const { user } = useAuth()
  const { get } = useServiceOvertime()

  const formModel = reactive<IOvertimeForm>({
    user_id: user.id,
    id,
    date: '',
    period: [0, 0],
    reason: '',
    images: [],
    user: null,
    status: -1,
  })

  const status = ref<number>(0)

  const { fetch, fetchState } = useFetch(async () => {
    const { data } = await get(id)

    formModel.date = data.date
    formModel.period = data.period
    formModel.reason = data.reason
    formModel.images = data.images
    formModel.user = data.user
    formModel.status = data.status

    status.value = data.status
  })

  return { formModel, fetch, fetchState, status }
}
