import { reactive, ref, useFetch, useRoute } from '@nuxtjs/composition-api'
import { debouncedWatch } from '@vueuse/core'
import { useAuth } from '@/composables'
import { useServiceInvoiceParticipant } from '@/services'
import {
  IInvoiceParticipant,
  IInvoiceParticipantForm,
  IParamsInvoiceParticipant,
} from '@/interfaces/invoiceParticipant'

export const useFetchDetailInvoiceParticipant = () => {
  const route = useRoute()
  const id = Number(route.value.params.id)
  const { user } = useAuth()

  const formModel = reactive<IInvoiceParticipantForm>({
    id,
    model_code: '',
    model_status: 0,
    status: 0,
    model_id: 0,
    model_name: '',
    user_id: user.id,
    role: 'TECHNIQUE',
    note: '',
    value: '',
    docs: [],
    created_at: '',
  })

  const { get } = useServiceInvoiceParticipant()

  const { fetch, fetchState } = useFetch(async () => {
    const { data } = await get(id)

    formModel.model_id = data.model_id
    formModel.model_name = data.model_name
    formModel.model_status = data.model_status
    formModel.model_code = data.model_code
    formModel.status = data.status
    formModel.model_name = data.model_name
    formModel.role = data.role
    formModel.note = data.note
    formModel.value = data.value
    formModel.docs = data.docs || []
    formModel.created_at = data.created_at
  })

  return { formModel, fetch, fetchState }
}

export const useFetchInvoiceParticipant = (
  params: IParamsInvoiceParticipant
) => {
  const { all } = useServiceInvoiceParticipant()

  const invoiceParticipants = ref<IInvoiceParticipant[]>([])
  const total = ref(0)

  const { fetch, fetchState } = useFetch(async () => {
    try {
      const { data, meta } = await all(params)

      invoiceParticipants.value = data
      total.value = meta.total
    } catch (e) {
      console.log({ e })
    }
  })

  debouncedWatch(params, fetch, { debounce: 300 })

  return { invoiceParticipants, total, fetch, fetchState }
}
