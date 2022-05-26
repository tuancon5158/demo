import { computed, reactive, toRefs, Ref } from '@nuxtjs/composition-api'
import { IServiceStatus } from '@/interfaces/serviceStatus'

export enum SERVICE_STATUS {
  CANCEL = -1,
  PENDING,
  SUCCESS,
}

export interface TYPE_SERVICE_STATUS {
  label: string
  value: IServiceStatus
}

export const serviceStatuses: TYPE_SERVICE_STATUS[] = [
  {
    label: 'Thành công',
    value: SERVICE_STATUS.SUCCESS,
  },
  {
    label: 'Chờ duyệt',
    value: SERVICE_STATUS.PENDING,
  },
  {
    label: 'Bị huỷ',
    value: SERVICE_STATUS.CANCEL,
  },
]

export const statusDefault = {
  label: '',
  class: 'tag-status',
}

export const useServiceStatus = (status: Ref) => {
  const state = reactive({
    isSuccess: computed(() => status.value === SERVICE_STATUS.SUCCESS),
    isPending: computed(() => status.value === SERVICE_STATUS.PENDING),
    isCancel: computed(() => status.value === SERVICE_STATUS.CANCEL),
  })

  const isEqualStatus = (item: TYPE_SERVICE_STATUS) =>
    item.value === status.value

  const currentServiceStatus = computed(() => {
    return serviceStatuses.find(isEqualStatus) || statusDefault
  })

  const label = computed(() => currentServiceStatus.value.label)

  return {
    ...toRefs(state),
    label,
    currentServiceStatus,
  }
}

export const disabledBtnApprove = (item: any) => {
  return item.status !== SERVICE_STATUS.PENDING
}
export const disabledBtnReject = (item: any) => {
  return item.status === SERVICE_STATUS.CANCEL
}
