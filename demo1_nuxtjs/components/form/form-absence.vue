<template>
  <a-form-model
    ref="formRef"
    :model="form"
    :rules="rules"
    @submit="$emit('submit')"
    @submit.native.prevent
  >
    <a-form-model-item label="Ngày bắt đầu" prop="startDate">
      <t-datetime-picker
        v-model="form.startDate"
        placeholder="Chọn ngày"
        type="date"
      ></t-datetime-picker>
    </a-form-model-item>

    <a-form-model-item label="Ngày kết thúc" prop="endDate">
      <t-datetime-picker
        v-model="form.endDate"
        placeholder="Chọn ngày"
        type="date"
      ></t-datetime-picker>
    </a-form-model-item>

    <a-form-model-item
      ref="time_blocks"
      label="Ca / buổi xin nghỉ phép"
      prop="time_blocks"
      required
    >
      <div v-if="dateBlocks.length" class="px-4">
        <a-checkbox-group v-model="form.time_blocks">
          <div
            v-for="dateBlock in dateBlocks"
            :key="'date_block_' + dateBlock.date"
          >
            <div
              v-for="timeBlock in dateBlock.time_blocks"
              :key="'time_block_' + timeBlock.id"
            >
              <a-checkbox :value="timeBlock.id">
                <span class="capitalize">
                  {{ getLabelTimeBlock(timeBlock, dateBlock) }}
                </span>
              </a-checkbox>
            </div>
          </div>
        </a-checkbox-group>
      </div>
    </a-form-model-item>

    <a-form-model-item v-show="form.time_blocks.length">
      <div class="font-bold text-sm text-center">
        Thời lượng: {{ totalMinutes }} phút ({{ totalHours }} giờ)
      </div>
    </a-form-model-item>

    <a-form-model-item label="Nội dung" prop="reason">
      <a-textarea
        v-model="form.reason"
        :auto-size="{ minRows: 3, maxRows: 6 }"
      />
    </a-form-model-item>

    <button v-show="false" type="submit">Submit</button>
  </a-form-model>
</template>

<script lang="ts">
import {
  computed,
  ComputedRef,
  defineComponent,
  PropType,
  reactive,
  ref,
  SetupContext,
  toRef,
  watch,
} from '@nuxtjs/composition-api'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import moment from 'moment'
import { useAuth, useConfig, useForm, useDatePickerRange } from '@/composables'
import { useServiceDateBlock } from '@/services'
import { parseTimeToString } from '@/utils'
import { ITimeBlock } from '@/interfaces/timeBlock'
import { IAbsenceForm } from '@/interfaces/absence'
import { IDataDateOfUser } from '@/interfaces/dateOfUser'

dayjs.extend(isSameOrBefore)

const useDateRange = (form: IAbsenceForm) => {
  const config = useConfig()

  const dateRange = computed(() => {
    if (!form.startDate) return [] as string[]

    const range: string[] = []
    let date = dayjs(form.startDate)

    while (date.isSameOrBefore(form.endDate, 'date')) {
      range.push(date.format(config.dateFormat))
      date = date.add(1, 'day')
    }

    return range
  })

  return { dateRange }
}

const useFetchDateOfUser = (
  dateRange: ComputedRef<string[]>,
  context: SetupContext
) => {
  const { user } = useAuth()
  const { getDateOfUser } = useServiceDateBlock()

  const dateBlocks = ref<IDataDateOfUser[]>([])

  const getAllTimeBlock = async () => {
    try {
      const data = await Promise.allSettled(
        dateRange.value.map(date => {
          const params = {
            user_id: user.id,
            date,
          }

          return getDateOfUser(params)
        })
      )

      dateBlocks.value = data
        .filter(item => item.status === 'fulfilled')
        .map(item => {
          // @ts-ignore
          return item.value.data
        })

      if (!dateBlocks.value.length) {
        // @ts-ignore
        context.refs.time_blocks.onFieldChange()
      } else {
        // @ts-ignore
        context.refs.formRef.clearValidate()
      }
    } catch {
      dateBlocks.value = []
    }
  }

  watch(dateRange, getAllTimeBlock)

  return { dateBlocks }
}

export default defineComponent({
  name: 'FormAbsence',
  props: {
    value: {
      type: Object as PropType<IAbsenceForm>,
      required: true,
    },
  },
  setup(props, context) {
    const form = reactive(props.value)
    const { validate } = useForm(context)

    const { dateRange } = useDateRange(form)

    const {
      disabledEndDate,
      disabledStartDate,
      handleEndOpenChange,
      handleStartOpenChange,
      endOpen,
    } = useDatePickerRange({
      startDate: toRef(form, 'startDate'),
      endDate: toRef(form, 'endDate'),
    })

    const { dateBlocks } = useFetchDateOfUser(dateRange, context)

    const getLabelTimeBlock = (
      timeBlock: ITimeBlock,
      dateBlock: IDataDateOfUser
    ) => {
      const [startTime, endTime] = timeBlock.period
      const strStartTime = parseTimeToString(startTime)
      const strEndTime = parseTimeToString(endTime)
      const strDate = moment(dateBlock.date).format('dddd [, ngày] DD/MM')

      return `${strStartTime} - ${strEndTime} (${strDate})`
    }

    const totalHours = computed(() => {
      return form.time_blocks.reduce((acc, timeBlockId) => {
        let currentTimeBlock: any = null

        dateBlocks.value.forEach(dateBlock => {
          dateBlock.time_blocks.forEach(timeBlock => {
            if (timeBlock.id === timeBlockId) {
              currentTimeBlock = timeBlock
            }
          })
        })

        if (!currentTimeBlock) return acc

        acc += currentTimeBlock.period[1] - currentTimeBlock.period[0]

        return acc
      }, 0)
    })

    const totalMinutes = computed(() => {
      return totalHours.value * 60
    })

    return {
      form,
      validate,
      dateBlocks,
      getLabelTimeBlock,
      totalHours,
      totalMinutes,
      dateRange,

      disabledEndDate,
      disabledStartDate,
      handleEndOpenChange,
      handleStartOpenChange,
      endOpen,
    }
  },
  data() {
    const validateTimeBlocks = (
      _: any,
      time_blocks: string[],
      callback: any
    ) => {
      // @ts-ignore
      if (!this.dateBlocks.length) {
        // @ts-ignore
        if (!this.form.startDate || !this.form.endDate) {
          callback(
            new Error(
              'Vui lòng chọn ngày bắt đầu và ngày kết thúc để hiển thị ca làm việc.'
            )
          )
        } else {
          callback(
            new Error('Rất tiếc. Khoảng thời gian này không có ca làm việc.')
          )
        }
      } else if (time_blocks.length === 0) {
        callback(new Error('Ca làm việc là bắt buộc'))
      } else {
        callback()
      }
    }

    return {
      rules: {
        reason: [
          {
            required: true,
            message: 'Nội dung là bắt buộc',
            trigger: 'change',
          },
        ],
        startDate: [
          {
            required: true,
            message: 'Ngày bắt đầu là bắt buộc',
            trigger: 'change',
          },
        ],
        endDate: [
          {
            required: true,
            message: 'Ngày kết thúc là bắt buộc',
            trigger: 'change',
          },
        ],
        time_blocks: [
          {
            validator: validateTimeBlocks,
            trigger: 'change',
          },
        ],
      },
    }
  },
})
</script>

<style scoped></style>
