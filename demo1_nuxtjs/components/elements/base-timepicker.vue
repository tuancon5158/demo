<template>
  <a-time-picker
    :default-value="defaultValue"
    :size="size"
    :format="format"
    class="!w-full"
    type="time"
    v-bind="$attrs"
    v-on="{ ...$listeners, change: onChangeTime }"
  />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import moment from 'moment'
import { useConfig } from '@/composables'

export default defineComponent({
  name: 'BaseTimepicker',
  props: {
    value: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: 'large',
    },
    format: {
      type: String,
      default: 'HH:mm',
    },
  },
  setup(props, { emit }) {
    const config = useConfig()

    const timeFormat = config.timeFormat
    const defaultValue = props.value ? moment(props.value, props.format) : null

    const onChangeTime = (time: moment.Moment, timeString: string) => {
      emit('input', timeString || '')
      emit('change', { time, timeString })
    }

    return { defaultValue, timeFormat, onChangeTime }
  },
})
</script>
