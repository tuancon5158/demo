import { ref, watch } from '@nuxtjs/composition-api'
import moment from 'moment'
import { useRouteQuery } from '@/composables'

export const useDatePicker = () => {
  const timeFrom = useRouteQuery<string | undefined>('timeFrom')
  const timeTo = useRouteQuery<string | undefined>('timeTo')
  const defaultValue = ref<moment.Moment>()

  const onChangeDate = (_: any, date: string) => {
    if (!date) {
      timeFrom.value = undefined
      setTimeout(() => (timeTo.value = undefined))
    } else {
      timeFrom.value = date
      setTimeout(() => (timeTo.value = date))
    }
  }

  const setDate = () => {
    const isEqualDate = timeFrom.value === timeTo.value

    defaultValue.value = isEqualDate ? moment(timeFrom.value) : undefined
  }

  watch([timeFrom, timeTo], setDate, { immediate: true })

  return { onChangeDate, defaultValue }
}
