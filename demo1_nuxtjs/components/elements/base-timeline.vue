<template>
  <div class="w-full min-w-[300px] relative my-5">
    <div class="flex space-x-1">
      <div
        v-for="(timeBlock, index) in timeBlocks"
        :key="index"
        class="
          relative
          h-6
          rounded-sm
          min-w-[40px]
          transition-all
          duration-300
          ease-in-out
        "
        :style="genStylesTimeBlock(timeBlock)"
      >
        <div
          class="absolute bg-light-500 w-full h-4 rounded-sm min-w-[60px]"
          :class="[
            index % 2 === 0 ? '-top-5' : '-bottom-5',
            index === 0 ? 'left-0' : 'right-0',
          ]"
        >
          <div class="w-full relative text-xs text-[8px] font-bold">
            <span class="absolute top-0 left-1">
              {{ timeBlock.period[0] | parseTimeToString }}
            </span>
            <span class="absolute top-0 right-1">
              {{ timeBlock.period[1] | parseTimeToString }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { parseTimeToString } from '@/utils/formatter'
import { ITimeBlock } from '@/interfaces/timeBlock'

export default defineComponent({
  name: 'BaseTimeline',
  filters: { parseTimeToString },
  props: {
    timeBlocks: {
      type: Array as PropType<ITimeBlock[]>,
      default: () => [],
    },
  },
  setup(props) {
    const totalTime = computed(() => {
      return props.timeBlocks.reduce((acc, timeBlock) => {
        const [startTime, endTime] = timeBlock.period

        acc += endTime - startTime

        return acc
      }, 0)
    })

    const genStylesTimeBlock = (timeBlock: ITimeBlock) => {
      const [startTime, endTime] = timeBlock.period
      const totalTimeShift = endTime - startTime

      return {
        backgroundColor: timeBlock.block_type.color,
        width: `${(totalTimeShift / totalTime.value) * 100}%`,
      }
    }

    return { totalTime, genStylesTimeBlock }
  },
})
</script>
