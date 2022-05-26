import { onBeforeMount, ref } from '@nuxtjs/composition-api'
import { useServiceTimesheet } from '@/services'
import { ITimesheet, ITimesheetForm } from '@/interfaces/timesheet'

export const TIMESHEET_DEFAULT = {
  name: '',
  status: 0,
  note: '',
  timeline: {
    '2': [
      [8.5, 12],
      [13.5, 18],
    ],
    '3': [
      [8.5, 12],
      [13.5, 18],
    ],
    '4': [
      [8.5, 12],
      [13.5, 18],
    ],
    '5': [
      [8.5, 12],
      [13.5, 18],
    ],
    '6': [
      [8.5, 12],
      [13.5, 18],
    ],
    '7': [[8.5, 12]],
    '8': [],
  },
} as ITimesheetForm

export const timesheets = ref<ITimesheet[]>([])

export const useTimesheets = () => {
  const { all } = useServiceTimesheet()

  const fetch = async () => {
    try {
      const { data } = await all({})

      timesheets.value = data
    } catch (e) {
      console.log({ e })
    }
  }

  const findTimesheet = (id: number) => {
    return timesheets.value.find(timesheet => timesheet.id === id)
  }

  onBeforeMount(async () => {
    if (timesheets.value.length) return

    await fetch()
  })

  return { timesheets, fetch, findTimesheet }
}
