import { computed, onBeforeMount, ref } from '@nuxtjs/composition-api'
import { useServiceWorkStatus } from '@/services'
import { IWorkStatus } from '@/interfaces/workStatus'

const formatterOptions = (workStatus: IWorkStatus) => ({
  label: workStatus.name,
  value: workStatus.id,
})

export const workStatuses = ref<IWorkStatus[]>([])

export const useWorkStatuses = () => {
  const { all } = useServiceWorkStatus()

  const fetch = async () => {
    try {
      const { data } = await all()

      workStatuses.value = data
    } catch (e) {
      console.log({ e })
    }
  }

  const findWorkStatus = (id: number) => {
    return workStatuses.value.find(workStatus => workStatus.id === id)
  }

  onBeforeMount(async () => {
    if (workStatuses.value.length) return

    await fetch()
  })

  return { workStatuses, fetch, findWorkStatus }
}

export const useGetterWorkStatus = () => {
  const { workStatuses } = useWorkStatuses()

  const workStatusId = ref<number | undefined>(undefined)
  const workStatusChildId = ref<number | undefined>(undefined)

  const isExistParentId = (item: IWorkStatus) => Boolean(item.parent_id)

  const isNotExistParentId = (item: IWorkStatus) => !item.parent_id

  const workStatusParent = computed(() => {
    return workStatuses.value.filter(isNotExistParentId).map(formatterOptions)
  })

  const workStatusChild = computed(() => {
    if (workStatusId.value === null) return []

    return workStatuses.value
      .filter(workStatus => workStatus.parent_id === workStatusId.value)
      .map(formatterOptions)
  })

  return {
    workStatuses,
    workStatusId,
    workStatusChildId,
    workStatusParent,
    workStatusChild,
    isExistParentId,
    isNotExistParentId,
  }
}
