import { useRoute, watch } from '@nuxtjs/composition-api'
import { isArray, parseQueryToArrayNumber } from '@/utils'

export const useSetQueryToParams = (params: any) => {
  const route = useRoute()

  const getQuery = () =>
    route.value.query as { [index: string]: string | undefined }

  const setQueryToParam = (params: any, key: string) => {
    const value = getQuery()?.[key]

    if (key in params.filter) {
      if (isArray(params.filter[key])) {
        if (value) {
          params.filter[key] = parseQueryToArrayNumber(value)
        }
      } else {
        params.filter[key] = Number(value) || undefined
      }
    }
  }

  const setQueryToParams = () => {
    const queryNumberList = [
      'user_id',
      'area_id',
      'status',
      'branch_id',
      'dept_id',
      'title_id',
      'apply_for_account',
      'type',
      'time_sheet_id',
      'career_path',
      'behavior_group_id',
    ]

    queryNumberList.forEach(key => {
      setQueryToParam(params, key)
    })

    const {
      search,
      timeFrom,
      timeTo,
      fromWeight,
      toWeight,
      fromMoney,
      toMoney,
    } = getQuery()

    params.search = search || ''

    if (
      params.filter.from_weight !== undefined ||
      params.filter.fromWeight !== undefined
    ) {
      params.filter.from_weight = params.filter.fromWeight =
        Number(fromWeight) || ''
    }

    if (
      params.filter.to_weight !== undefined ||
      params.filter.toWeight !== undefined
    ) {
      params.filter.to_weight = params.filter.toWeight = Number(toWeight) || ''
    }

    if (params.filter.fromMoney !== undefined) {
      params.filter.fromMoney = Number(fromMoney) || ''
    }

    if (params.filter.toMoney !== undefined) {
      params.filter.toMoney = Number(toMoney) || ''
    }

    if (params.filter.time_from !== undefined) {
      params.filter.time_from = timeFrom || ''
    }

    if (params.filter.time_to !== undefined) {
      params.filter.time_to = timeTo || ''
    }
  }

  watch(() => route.value.query, setQueryToParams, { immediate: true })

  return {}
}
