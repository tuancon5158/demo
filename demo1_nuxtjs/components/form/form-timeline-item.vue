<template>
  <div class="flex justify-center space-x-2">
    <a-time-picker
      v-model="firstTime"
      :allow-clear="false"
      :disabled="disabled"
      :format="$config.shortTimeFormat"
      :minute-step="15"
      class="flex-1"
    />
    <a-time-picker
      v-model="endTime"
      :allow-clear="false"
      :disabled="disabled"
      :format="$config.shortTimeFormat"
      :minute-step="15"
      class="flex-1"
    />

    <slot name="action"></slot>
  </div>
</template>

<script>
import { computed, defineComponent } from '@nuxtjs/composition-api'
import moment from 'moment'
import { useConfig } from '@/composables'
import { parseStringToTime, parseTimeToString } from '@/utils'

export default defineComponent({
  name: 'FormTimelineItem',

  props: {
    timeline: {
      type: Array,
      required: true,
    },
    date: {
      type: String,
      default: '',
    },
  },

  setup(props, { emit }) {
    const config = useConfig()

    const firstTime = computed({
      get() {
        return moment(
          parseTimeToString(props.timeline[0]),
          config.shortTimeFormat
        )
      },
      set(value) {
        const parseFirstTime = parseStringToTime(
          value.format(config.shortTimeFormat)
        )

        emit('update:timeline', [parseFirstTime, props.timeline[1]])
      },
    })

    const endTime = computed({
      get() {
        return moment(
          parseTimeToString(props.timeline[1]),
          config.shortTimeFormat
        )
      },
      set(value) {
        const parseEndTime = parseStringToTime(
          value.format(config.shortTimeFormat)
        )

        const endTime = parseEndTime === 0 ? 24 : parseEndTime

        emit('update:timeline', [props.timeline[0], endTime])
      },
    })

    const activatedDate = computed(() => {
      const time = `${parseTimeToString(props.timeline[0])}:00`

      return moment(`${props.date} ${time}`)
    })

    const disabled = computed(() => {
      return moment().isSameOrAfter(activatedDate.value, 'hours')
    })

    return { firstTime, endTime, activatedDate, disabled }
  },
})
</script>
