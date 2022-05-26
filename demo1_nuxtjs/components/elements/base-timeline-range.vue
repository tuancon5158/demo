<template>
  <div class="w-full min-w-[300px] relative my-6">
    <div ref="wrapperEl" class="bg-green-50 h-4 w-full rounded-sm"></div>

    <div
      v-for="(timeBlock, key) in timeBlocks"
      :key="key"
      class="
        absolute
        h-6
        -top-1
        z-[1]
        rounded-sm
        transition-all
        duration-300
        ease-in-out
      "
      :style="genStyles(timeBlock)"
    >
      <div
        class="absolute bg-light-500 w-full h-4 rounded-sm min-w-[60px]"
        :class="[
          key % 2 === 0 ? '-top-5' : '-bottom-5',
          key === 0 ? 'left-0' : 'right-0',
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
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
} from '@nuxtjs/composition-api'
import { useElementSize } from '@vueuse/core'
import { parseTimeToString } from '@/utils/formatter'
import { ITimeBlock } from '@/interfaces/timeBlock'

const MINUTES_A_HOUR = 60

export default defineComponent({
  name: 'BaseTimelineRange',
  filters: { parseTimeToString },
  props: {
    timeLineStart: {
      type: Number,
      default: 0,
    },
    timeLineEnd: {
      type: Number,
      default: 24,
    },
    unitTime: {
      type: Number,
      default: 30, // 30 phút
    },
    timeBlocks: {
      type: Array as PropType<ITimeBlock[]>,
      default: () => [],
    },
  },
  setup(props) {
    const wrapperEl = ref(null)
    const { width: widthWrapper } = useElementSize(wrapperEl)

    const unitTimeInAHour = computed(() => {
      return MINUTES_A_HOUR / props.unitTime
    })

    const countHalfHourTimeLine = computed(() => {
      // tính số đơn vị 30p trong khoảng thời gian 1 ngày theo time line
      return (props.timeLineEnd - props.timeLineStart) * unitTimeInAHour.value
    })

    const halfHourWidth = computed(() => {
      // tính xem 1 đơn vị 30p thì bằng bao nhiêu width
      return widthWrapper.value / countHalfHourTimeLine.value
    })

    const getCountHalfHour = (time: number) => {
      // tính số đơn vị 30p trong khoảng từ đầu ngày đến thời gian đã cho
      return (time - props.timeLineStart) * unitTimeInAHour.value
    }

    const genPosition = (shift: [number, number]) => {
      if (!shift && !Array.isArray(shift)) return { left: '0px', width: '0px' }

      const [startTime, endTime] = shift
      const left = getCountHalfHour(startTime) * halfHourWidth.value + 1
      const right = getCountHalfHour(endTime) * halfHourWidth.value + 1
      const width = right - left - 1

      return {
        left: `${left}px`,
        width: `${width}px`,
      }
    }

    const genStyles = (timeBlock: ITimeBlock) => {
      const { width, left } = genPosition(timeBlock.period)

      return {
        backgroundColor: timeBlock.block_type.color,
        left,
        width,
      }
    }

    return { wrapperEl, genPosition, genStyles }
  },
})
</script>
