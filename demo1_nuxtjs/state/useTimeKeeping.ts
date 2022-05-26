import moment from 'moment'
import { ITimeKeeping } from '@/interfaces/timeKeeping'

const getDateTime = (date: string, time: string) => {
  if (!date && !time) return ''

  if (!time) return moment(date).format('DD/MM/YYYY')

  return moment(`${date} ${time}`).format('HH:mm DD/MM/YYYY')
}

export const useGetterTimeKeeping = () => {
  const getUserName = (item: ITimeKeeping) => {
    return `${item.user.name} - ${item.user.id}`
  }

  const getRealDateTime = (item: ITimeKeeping) => {
    return getDateTime(item.real_date, item.real_time)
  }

  const getStandardDateTime = (item: ITimeKeeping) => {
    return getDateTime(item.real_date, item.standard_time)
  }

  return { getUserName, getRealDateTime, getStandardDateTime }
}
