import { ref } from '@nuxtjs/composition-api'
import { IStatusValue } from '@/interfaces/status'

interface Status {
  value: number
  label: string
}

export const useStatus = () => {
  const statuses = ref<Status[]>([
    { value: 1, label: 'Active' },
    { value: 0, label: 'Inactive' },
  ])

  const getStatus = (id: IStatusValue) => {
    return statuses.value.find(status => status.value === id)
  }

  const getLabelStatus = (id: IStatusValue) => {
    const status = getStatus(id)

    if (!status) return ''

    return status.label
  }

  return { statuses, getStatus, getLabelStatus }
}
