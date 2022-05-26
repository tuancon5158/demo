import { ref, Ref } from '@nuxtjs/composition-api'
import moment from 'moment'

export const useDatePickerRange = ({
  startDate,
  endDate,
}: {
  startDate: Ref<string>
  endDate: Ref<string>
}) => {
  const endOpen = ref(false)

  const disabledStartDate = (startValue: moment.Moment) => {
    if (!startValue || !endDate.value) {
      return false
    }

    return startValue.valueOf() > moment(endDate.value).valueOf()
  }

  const disabledEndDate = (endValue: moment.Moment) => {
    if (!endValue || !startDate.value) {
      return false
    }

    return moment(startDate.value).valueOf() > endValue.valueOf()
  }

  const handleStartOpenChange = (open: boolean) => {
    if (!open) {
      endOpen.value = true
    }
  }

  const handleEndOpenChange = (open: boolean) => {
    endOpen.value = open
  }

  return {
    endOpen,
    disabledEndDate,
    disabledStartDate,
    handleEndOpenChange,
    handleStartOpenChange,
  }
}
