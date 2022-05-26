import { computed, reactive, ref } from '@nuxtjs/composition-api'
import dayjs from 'dayjs'
import quarter from 'dayjs/plugin/quarterOfYear'

dayjs.extend(quarter)

export interface Time {
  month: number
  quarter: number
  year: number
}

export const useDateTime = () => {
  const date = ref(dayjs())

  const time: Time = reactive({
    month: computed(() => date.value.month() + 1),
    quarter: computed(() => date.value.quarter()),
    year: computed(() => date.value.year()),
  })

  const prevMonth = () => (date.value = date.value.subtract(1, 'month'))
  const nextMonth = () => (date.value = date.value.add(1, 'month'))
  const prevQuarter = () => (date.value = date.value.subtract(1, 'quarter'))
  const nextQuarter = () => (date.value = date.value.add(1, 'quarter'))
  const prevYear = () => (date.value = date.value.subtract(1, 'year'))
  const nextYear = () => (date.value = date.value.add(1, 'year'))

  return {
    date,
    time,
    prevMonth,
    nextMonth,
    prevQuarter,
    nextQuarter,
    prevYear,
    nextYear,
  }
}
