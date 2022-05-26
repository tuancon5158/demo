import dayjs from 'dayjs'
import { ITimeBlock } from '@/interfaces/timeBlock'
import { parseTimeToString, formatDateTime } from '@/utils'

export const useTimeBlocks = () => {
  const getSortedTimeBlocks = (timeBlocks: ITimeBlock[]) => {
    return [...timeBlocks].sort(
      (a, b) =>
        dayjs(a.date_block.date).valueOf() - dayjs(b.date_block.date).valueOf()
    )
  }

  const getStartDate = (timeBlocks: ITimeBlock[]) => {
    const sortedTimeBlocks = getSortedTimeBlocks(timeBlocks)

    if (!sortedTimeBlocks.length) return ''

    const startDate = sortedTimeBlocks[0]

    if (!startDate.period.length) return startDate.date_block.date

    return formatDateTime(
      startDate.date_block.date,
      parseTimeToString(startDate.period[0])
    )
  }
  const getEndDate = (timeBlocks: ITimeBlock[]) => {
    const sortedTimeBlocks = getSortedTimeBlocks(timeBlocks)

    if (!sortedTimeBlocks.length) return ''

    const endDate = sortedTimeBlocks[sortedTimeBlocks.length - 1]

    if (!endDate.period.length) return endDate.date_block.date

    return formatDateTime(
      endDate.date_block.date,
      parseTimeToString(endDate.period[1])
    )
  }
  const getTotalTime = (timeBlocks: ITimeBlock[]) => {
    return timeBlocks.reduce((acc, timeBlock) => {
      if (!timeBlock.period.length) return acc

      acc += timeBlock.period[1] - timeBlock.period[0]

      return acc
    }, 0)
  }

  return { getStartDate, getEndDate, getTotalTime }
}
