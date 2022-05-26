import moment from 'moment'

const DATE_TIME_FORMAT = 'HH:mm DD/MM/YYYY'

export const formatDateTime = (date: string, time?: string): string => {
  if (!date) return ''

  if (!time) return moment(date).format(DATE_TIME_FORMAT)

  const datetime = `${date} ${time}`

  return moment(datetime).format(DATE_TIME_FORMAT)
}
