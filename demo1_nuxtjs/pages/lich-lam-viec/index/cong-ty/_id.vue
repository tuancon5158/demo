<template>
  <a-modal
    v-model="visible"
    :after-close="back"
    centered
    title="Cập nhật thời gian làm việc cho nhân sự"
    width="70%"
    @ok="handleSubmit"
  >
    <div class="flex items-center justify-center space-x-4">
      <a-icon class="text-2xl cursor-pointer" type="left" @click="onPrevWeek" />
      <div class="flex flex-col items-center">
        <span class="text-2xl font-bold">{{ title }}</span>
        <span>{{ subtitle }}</span>
      </div>
      <a-icon
        class="text-2xl cursor-pointer"
        type="right"
        @click="onNextWeek"
      />
    </div>

    <div class="flex justify-between space-x-4 mt-4">
      <div
        v-for="(dateBlock, index) in syncDateBlocks"
        :key="'date-' + index"
        :class="{ 'bg-primary text-white': date === dateBlock.date }"
        class="border rounded w-24 text-center leading-8 py-2 cursor-pointer"
        @click="setActiveDate(dateBlock.date)"
      >
        <div class="capitalize">{{ getDay(dateBlock.date) }}</div>

        <div>{{ getTotalTime(dateBlock.time_blocks) }}h</div>
      </div>
    </div>

    <div class="flex flex-col items-center mt-4">
      <div v-if="activatedDateBlock" class="flex flex-col items-end">
        <span class="capitalize font-bold my-2">
          {{ titleActiveDate }}
        </span>

        <a-form-model ref="formRef" :model="activatedDateBlock" :rules="rules">
          <a-form-model-item prop="time_blocks">
            <div class="flex flex-col space-y-2">
              <form-timeline-item
                v-for="(timeBlock, key) in activatedDateBlock.time_blocks"
                :key="'timeline-item-' + key + timeBlock"
                :timeline.sync="timeBlock.period"
                :date="date"
              >
                <template #action>
                  <a-button
                    v-if="moment().isSameOrBefore(date, 'day')"
                    icon="minus"
                    @click="removeShift(key)"
                  ></a-button>
                </template>
              </form-timeline-item>

              <div class="flex justify-end">
                <a-button
                  v-if="moment().isSameOrBefore(date, 'day')"
                  :disabled="disabledAddMore"
                  icon="plus"
                  @click="addShift"
                ></a-button>
              </div>
            </div>
          </a-form-model-item>
        </a-form-model>
      </div>
    </div>

    <template slot="footer">
      <a-button key="back" @click="visible = false">Huỷ bỏ</a-button>
      <a-button key="submit" type="primary" @click="handleSubmit">
        Xác nhận
      </a-button>
    </template>
  </a-modal>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  reactive,
  ref,
  Ref,
  useRoute,
  watch,
} from '@nuxtjs/composition-api'
import dayjs from 'dayjs'
import moment from 'moment'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import isoWeek from 'dayjs/plugin/isoWeek'
import cloneDeep from 'lodash/cloneDeep'
import difference from 'lodash/difference'
import { Modal } from 'ant-design-vue'
import FormTimelineItem from '@form/form-timeline-item.vue'
import {
  useConfig,
  useForm,
  useNotification,
  useTimeBlocks,
  useRouteQuery,
} from '@/composables'
import { useServiceDateBlock } from '@/services'
import { useFetchDateBlock } from '@/state'
import { IDateBlock, IParamsDateBlock } from '@/interfaces/dateBlock'
import { ITimeBlock } from '@/interfaces/timeBlock'
import { IShift } from '@/interfaces/timesheet'

dayjs.extend(weekOfYear)
dayjs.extend(isoWeek)

const weekdays =
  '_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy_chủ nhật'.split('_')

const getDay = (date: string) => {
  return weekdays[dayjs(date).isoWeekday()]
}

export default defineComponent({
  name: 'DateBlockUpdate',
  components: { FormTimelineItem },
  setup(_, context) {
    const route = useRoute()
    const { validate } = useForm(context)
    const { error, success } = useNotification()
    const { add, edit } = useServiceDateBlock()
    const { getTotalTime } = useTimeBlocks()

    const { date, endOfWeek, startOfWeek, title, subtitle } = useWeek()

    const {
      fetch,
      dateBlocks,
      syncDateBlocks,
      differenceDateBlocks,
      activatedDateBlock,
      titleActiveDate,
      getDay,
      addShift,
      removeShift,
      disabledAddMore,
    } = useDateBlock({
      endOfWeek,
      startOfWeek,
      activatedDate: date,
    })

    const handleSubmit = async () => {
      try {
        await validate()

        await Promise.all(
          differenceDateBlocks.value.map(dateBlock => {
            if (dateBlock.id) {
              return edit({
                id: dateBlock.id,
                time_blocks: dateBlock.time_blocks,
              })
            }

            return add({
              user_id: Number(route.value.params.id),
              date: dateBlock.date,
              time_blocks: dateBlock.time_blocks,
            })
          })
        )

        success('Cập nhật thời gian làm việc cho nhân sự thành công')
        context.emit('fetch')

        return true
      } catch (e) {
        if (e === false) return false

        error(e?.data || 'Vui lòng thử lại')
      }
    }

    const confirmSave = (callback: () => void) => {
      Modal.confirm({
        title:
          'Bạn đã thay đổi lịch làm việc, bạn có chắc chắn muốn sang tuần tiếp theo!',
        onOk: async () => {
          const isValid = await handleSubmit()

          if (isValid) callback()
        },
        okText: 'Lưu và tiếp tục',
        cancelText: 'Huỷ bỏ',
      })
    }

    const onNextWeek = () => {
      const setNextWeek = () =>
        (date.value = dayjs(date.value).add(7, 'day').format('YYYY-MM-DD'))

      if (!differenceDateBlocks.value.length) {
        setNextWeek()

        return nextTick(fetch)
      }

      confirmSave(setNextWeek)
    }

    const onPrevWeek = () => {
      const setPrevWeek = () =>
        (date.value = dayjs(date.value).subtract(7, 'day').format('YYYY-MM-DD'))

      if (!differenceDateBlocks.value.length) {
        setPrevWeek()

        return nextTick(fetch)
      }

      confirmSave(setPrevWeek)
    }

    const setActiveDate = async (activeDate: string) => {
      try {
        await validate()
        date.value = activeDate
      } catch (e) {
        console.log('validate', e)
      }
    }

    return {
      dateBlocks,
      syncDateBlocks,
      activatedDateBlock,
      titleActiveDate,
      handleSubmit,
      date,
      title,
      subtitle,
      getDay,
      getTotalTime,
      setActiveDate,
      addShift,
      removeShift,
      disabledAddMore,
      onNextWeek,
      onPrevWeek,
      moment,
    }
  },
  data() {
    const validateTimeBlocks = (
      _: any,
      time_blocks: ITimeBlock[],
      callback: any
    ) => {
      const callbackError = () => {
        callback(new Error(`Thời gian bạn chọn trùng với ca làm việc đã có.`))
      }

      time_blocks.forEach(({ period }) => {
        const [startTime, endTime] = period
        const day = getDay((this as any).date)

        if (endTime < startTime) {
          callback(
            new Error('Thời gian kết thúc phải lớn hơn thời gian bắt đầu')
          )
        }

        if (endTime - startTime < 1) {
          callback(
            new Error(
              `Lỗi trong ${day}. Một timeblock phải có ít nhất 60 phút.`
            )
          )
        }
      })

      time_blocks.forEach((iteratorTimeBlock, index) => {
        if (index === 0) return

        const day = getDay((this as any).date)

        const [startTime, endTime] = time_blocks[index - 1].period

        if (startTime === iteratorTimeBlock.period[0]) return

        if (
          iteratorTimeBlock.period[0] < startTime &&
          startTime < iteratorTimeBlock.period[1]
        ) {
          callbackError()
        }

        if (
          iteratorTimeBlock.period[0] < endTime &&
          endTime < iteratorTimeBlock.period[1]
        )
          callbackError()

        if (
          startTime < iteratorTimeBlock.period[0] &&
          endTime > iteratorTimeBlock.period[1]
        )
          callbackError()

        if (iteratorTimeBlock.period[0] - endTime < 1) {
          callback(
            new Error(
              `Lỗi trong ${day}. Hai timeblock liền kề phải cách nhau ít nhất 60 phút.`
            )
          )
        }
      })

      callback()
    }

    return {
      visible: true,
      rules: {
        time_blocks: [{ validator: validateTimeBlocks, trigger: 'change' }],
      },
    }
  },
  methods: {
    back() {
      this.$router.push('/lich-lam-viec/cong-ty')
    },
  },
})

const useWeek = () => {
  const date = useRouteQuery('date', '')

  const week = computed(() => dayjs(date.value).week())
  const startOfWeek = computed(() => dayjs(date.value).startOf('isoWeek'))
  const endOfWeek = computed(() => dayjs(date.value).endOf('isoWeek'))
  const title = computed(() => `Tuần ${week.value}`)
  const subtitle = computed(
    () =>
      `Từ ${startOfWeek.value.format('DD/MM')} đến ${endOfWeek.value.format(
        'DD/MM'
      )}`
  )

  return {
    date,
    week,
    startOfWeek,
    endOfWeek,
    title,
    subtitle,
  }
}

const useDateBlock = ({
  endOfWeek,
  startOfWeek,
  activatedDate,
}: {
  endOfWeek: Ref<dayjs.Dayjs>
  startOfWeek: Ref<dayjs.Dayjs>
  activatedDate: Ref<string>
}) => {
  const config = useConfig()
  const route = useRoute()

  const params = reactive<IParamsDateBlock>({
    search: '',
    per_page: 10,
    cur_page: 1,
    filter: {
      time_from: startOfWeek.value.format(config.dateFormat),
      time_to: endOfWeek.value.format(config.dateFormat),
      user_id: [Number(route.value.params.id)],
      branch_id: [],
      area_id: [],
      block_type_id: [],
    },
    view_mode: 'personal',
  })

  watch([startOfWeek, endOfWeek], () => {
    params.filter.time_from = startOfWeek.value.format(config.dateFormat)
    params.filter.time_to = endOfWeek.value.format(config.dateFormat)
  })

  const { dateBlocks, fetch } = useFetchDateBlock(params)

  const syncDateBlocks = ref<IDateBlock[]>([])

  watch(dateBlocks, value => {
    syncDateBlocks.value = cloneDeep(value)
  })

  const differenceDateBlocks = computed(() => {
    return syncDateBlocks.value.filter((dateBlock, index) => {
      if (
        dateBlock.time_blocks.length !==
        dateBlocks.value[index].time_blocks.length
      ) {
        return true
      }

      const diffTimeBlocks = dateBlock.time_blocks.filter(
        (timeBlock, indexTimeBlock) => {
          const diff = difference(
            timeBlock.period,
            dateBlocks.value[index].time_blocks[indexTimeBlock].period
          )

          return diff.length
        }
      )

      return diffTimeBlocks.length
    })
  })

  const activeDateBlockIndex = computed(() => {
    return syncDateBlocks.value.findIndex(dateBlock => {
      return dateBlock.date === activatedDate.value
    })
  })

  const addShift = () => {
    if (activeDateBlockIndex.value < 0) return

    const activatedTimeBlocks =
      syncDateBlocks.value[activeDateBlockIndex.value].time_blocks

    if (activatedTimeBlocks.length) {
      const lastTimeBlock = activatedTimeBlocks[activatedTimeBlocks.length - 1]

      const lastHour = lastTimeBlock.period[1]
      const nextHour = lastHour + 4 >= 24 ? 23.5 : lastHour + 4
      const newShift = [lastHour, nextHour] as IShift
      const newTimeBlock = {
        period: newShift,
        block_type_id: 1,
        wage_weight: 1,
      } as ITimeBlock

      syncDateBlocks.value[activeDateBlockIndex.value].time_blocks.push(
        newTimeBlock
      )
    } else {
      const newTimeBlock = {
        period: [8.5, 12],
        block_type_id: 1,
        wage_weight: 1,
      } as ITimeBlock

      syncDateBlocks.value[activeDateBlockIndex.value].time_blocks.push(
        newTimeBlock
      )
    }
  }

  const removeShift = (index: number) => {
    syncDateBlocks.value[activeDateBlockIndex.value].time_blocks.splice(
      index,
      1
    )
  }

  const disabledAddMore = computed(() => {
    if (activeDateBlockIndex.value === -1) return true

    if (
      syncDateBlocks.value[activeDateBlockIndex.value].time_blocks.length === 0
    )
      return false

    const activatedTimeBlocks =
      syncDateBlocks.value[activeDateBlockIndex.value].time_blocks

    return (
      activatedTimeBlocks[activatedTimeBlocks.length - 1].period[1] === 23.5
    )
  })

  const activatedDateBlock = computed(() => {
    return syncDateBlocks.value.find(
      dateBlock => dateBlock.date === activatedDate.value
    )
  })

  const titleActiveDate = computed(() => {
    if (!activatedDateBlock.value) return ''

    const [year, month, date] = activatedDateBlock.value.date.split('-')

    return `${getDay(
      activatedDateBlock.value.date
    )}, ngày ${date} tháng ${month} năm ${year}`
  })

  return {
    fetch,
    getDay,
    titleActiveDate,
    activatedDateBlock,
    dateBlocks,
    syncDateBlocks,
    differenceDateBlocks,
    addShift,
    removeShift,
    disabledAddMore,
  }
}
</script>
