<template>
  <div class="w-full">
    <div class="flex justify-between space-x-4">
      <div
        v-for="(timeline, date) in timelineModel"
        :key="'date-' + date"
        :class="{ 'bg-primary text-white': isActiveDate(Number(date)) }"
        class="border rounded w-24 text-center leading-8 py-2 cursor-pointer"
        @click="setActiveDate(Number(date))"
      >
        <div class="capitalize">{{ weekdays[date] }}</div>

        <div>{{ getTotalTime(timeline) }}h</div>
      </div>
    </div>

    <div class="flex flex-col items-center mt-4">
      <div class="flex flex-col items-end">
        <form-timeline-item
          v-for="(timeline, key) in activatedTimeline"
          :key="'timeline-item-' + key + activeDate"
          :timeline="timeline"
          @update:timeline="$set(timelineModel[activeDate], key, $event)"
        >
          <template #action>
            <a-button icon="minus" @click="removeShift(key)"></a-button>
          </template>
        </form-timeline-item>

        <a-button
          icon="plus"
          :disabled="disabledAddMore"
          @click="addShift"
        ></a-button>
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
import { useVModel } from '@vueuse/core'
import FormTimelineItem from '@form/form-timeline-item.vue'
import {
  ITimeline,
  ITimeLineValue,
  ITimeLineKey,
  IShift,
} from '@/interfaces/timesheet'

const weekdays =
  '__thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy_chủ nhật'.split('_')

const DEFAULT_DATE = 2

const useActiveDate = () => {
  const activeDate = ref<ITimeLineKey>(DEFAULT_DATE)

  const isActiveDate = (date: ITimeLineKey) => {
    return activeDate.value === date
  }

  const setActiveDate = (date: ITimeLineKey) => {
    activeDate.value = date
  }

  return { activeDate, isActiveDate, setActiveDate }
}

export default defineComponent({
  name: 'FormTimeline',
  components: { FormTimelineItem },
  props: {
    value: {
      type: Object as PropType<ITimeline>,
      required: true,
    },
  },
  setup(props) {
    const timelineModel = useVModel(props)
    const { activeDate, isActiveDate, setActiveDate } = useActiveDate()

    const activatedTimeline = computed(() => {
      return timelineModel.value[activeDate.value]
    })

    const getTotalTime = (timeline: ITimeLineValue) => {
      return timeline.reduce((acc, shift) => {
        const [first, end] = shift

        const time = end - first

        acc += time

        return acc
      }, 0)
    }

    const addShift = () => {
      const timeline = timelineModel.value[activeDate.value]

      if (timeline.length) {
        const lastShift = timeline[timeline.length - 1]

        const lastHour = lastShift[1]
        const nextHour = lastHour + 4 >= 24 ? 23.5 : lastHour + 4
        const newShift = [lastHour, nextHour] as IShift

        timelineModel.value[activeDate.value].push(newShift)
      } else {
        timelineModel.value[activeDate.value].push([8.5, 12])
      }
    }

    const removeShift = (index: number) => {
      timelineModel.value[activeDate.value].splice(index, 1)
    }

    const disabledAddMore = computed(() => {
      if (activatedTimeline.value.length === 0) return false

      return (
        activatedTimeline.value[activatedTimeline.value.length - 1][1] === 23.5
      )
    })

    return {
      timelineModel,
      activatedTimeline,
      activeDate,
      isActiveDate,
      setActiveDate,
      getTotalTime,
      weekdays,
      addShift,
      removeShift,
      disabledAddMore,
    }
  },
})
</script>
