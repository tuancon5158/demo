<template>
  <div class="flex justify-start space-x-4">
    <base-time-block
      v-for="(timeBlock, index) in timeBlocksFiltered"
      :key="timeBlock.id + index"
      v-bind="timeBlock"
    ></base-time-block>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'

interface TimeBlock {
  id: number
  times: number
  color: string
  name: string
  description: string
}

export default defineComponent({
  name: 'BaseTimeBlocks',
  props: {
    timeBlocks: {
      type: Array as PropType<TimeBlock[]>,
      required: true,
    },
  },
  setup(props) {
    const timeBlocksFiltered = computed(() => {
      return props.timeBlocks.filter(timeBlock => timeBlock.times > 0)
    })

    return { timeBlocksFiltered }
  },
})
</script>
