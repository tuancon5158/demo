import { onMounted, ref, watch } from '@nuxtjs/composition-api'
import moment from 'moment'
import { useRouteQuery } from '@/composables'

export const useMonthPicker = () => {
  const timeFrom = useRouteQuery<string | undefined>('timeFrom')
  const timeTo = useRouteQuery<string | undefined>('timeTo')
  const defaultValue = ref<moment.Moment>()

  const onChangeMonth = (month: moment.Moment) => {
    if (!month) {
      timeFrom.value = undefined
      setTimeout(() => (timeTo.value = undefined))
    } else {
      timeFrom.value = month.startOf('month').format('YYYY-MM-DD')
      setTimeout(
        () => (timeTo.value = month.endOf('month').format('YYYY-MM-DD'))
      )
    }
  }

  const setMonth = () => {
    const isEqualStartOfMonth =
      moment(timeFrom.value).startOf('month').format('YYYY-MM-DD') ===
      timeFrom.value

    const isEqualEndOfMonth =
      moment(timeFrom.value).endOf('month').format('YYYY-MM-DD') ===
      timeTo.value

    defaultValue.value =
      isEqualStartOfMonth && isEqualEndOfMonth
        ? moment(timeFrom.value, 'YYYY-MM')
        : undefined
  }

  watch([timeFrom, timeTo], setMonth, { immediate: true })

  return { onChangeMonth, defaultValue }
}

export const useOnlyMonthPicker = (params: any) => {
  const month = useRouteQuery<number | undefined>('month')
  const year = useRouteQuery<number | undefined>('year')
  const defaultMonth = ref(moment())

  const onChangeMonth = (moment: moment.Moment) => {
    params.filter.month = month.value = moment.month() + 1

    setTimeout(() => {
      params.filter.year = year.value = moment.year()
    })
  }

  onMounted(() => {
    if (month.value && year.value) {
      const _month = month.value < 10 ? `0${month.value}` : month.value

      defaultMonth.value = moment(`${year.value}-${_month}`)
    }
  })

  return { onChangeMonth, defaultMonth }
}
