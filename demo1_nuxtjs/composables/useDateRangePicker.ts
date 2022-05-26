import { ref, watch } from '@nuxtjs/composition-api'
import moment from 'moment'
import { useRouteQuery } from '@/composables'
import { isEmpty } from '@/utils'

export const useDateRangePicker = () => {
  const timeFrom = useRouteQuery<string | undefined>('timeFrom')
  const timeTo = useRouteQuery<string | undefined>('timeTo')
  const defaultValue = ref<moment.Moment[]>([])

  const onChangeDateRange = (_: any, range: [string, string]) => {
    if (range.filter(isEmpty).length) {
      timeFrom.value = undefined
      setTimeout(() => (timeTo.value = undefined))
    } else {
      timeFrom.value = range[0]
      setTimeout(() => (timeTo.value = range[1]))
    }
  }

  const setDateRange = () => {
    const isExistDateRange = timeFrom.value && timeTo.value

    defaultValue.value = isExistDateRange
      ? [moment(timeFrom.value), moment(timeTo.value)]
      : []
  }

  watch([timeFrom, timeTo], setDateRange, { immediate: true })

  return { onChangeDateRange, defaultValue }
}
