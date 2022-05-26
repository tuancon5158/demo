<template>
  <a-form-model
    ref="formRef"
    :model="form"
    :rules="rules"
    @submit="$emit('submit')"
    @submit.native.prevent
  >
    <a-form-model-item label="Tên" prop="name">
      <a-input v-model="form.name" size="large"></a-input>
    </a-form-model-item>

    <a-form-model-item label="Trạng thái">
      <base-switch
        v-model="form.status"
        :active-value="1"
        :inactive-value="0"
      ></base-switch>
    </a-form-model-item>

    <a-form-model-item label="Mô tả" prop="note">
      <a-textarea
        v-model="form.note"
        :auto-size="{ minRows: 3, maxRows: 6 }"
      ></a-textarea>
    </a-form-model-item>

    <a-form-model-item label="Timeline" prop="timeline">
      <form-timeline ref="timeline" v-model="form.timeline"></form-timeline>
    </a-form-model-item>

    <button v-show="false" type="submit">Submit</button>
  </a-form-model>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from '@nuxtjs/composition-api'
import FormTimeline from '@form/form-timeline.vue'
import { useForm } from '@/composables'
import { ITimeline, ITimesheetForm } from '@/interfaces/timesheet'

export default defineComponent({
  name: 'FormTimesheet',
  components: { FormTimeline },
  props: {
    value: {
      type: Object as PropType<ITimesheetForm>,
      required: true,
    },
  },
  setup(props, context) {
    const form = reactive(props.value)

    const { validate } = useForm(context)

    return { form, validate }
  },
  data() {
    const validateTimeline = (_: any, timeline: ITimeline, callback: any) => {
      const totalShift = Object.entries(timeline).reduce((acc, [_, value]) => {
        acc += value.length

        return acc
      }, 0)

      if (totalShift === 0) {
        callback(new Error('Timeline là bắt buộc'))
      }

      const callbackError = (date: string) => {
        callback(
          new Error(
            `Hãy xem xét kỹ lại timeline ở thứ ${date}. Thời gian bạn chọn trùng với ca làm việc đã có.`
          )
        )
      }

      Object.entries(timeline).forEach(([date, shifts]) => {
        shifts.forEach((shift, index) => {
          if (index === 0) {
            const [startTime, endTime] = shift

            if (endTime < startTime) {
              callback(
                new Error('Thời gian kết thúc phải lớn hơn thời gian bắt đầu')
              )
            }

            if (endTime - startTime < 1) {
              callback(
                new Error(
                  `Lỗi trong thứ ${date}. Một timeblock phải có ít nhất 60 phút.`
                )
              )
            }

            return
          }

          const [startTime, endTime] = shifts[index - 1]

          if (startTime === shift[0]) return

          if (shift[0] < startTime && startTime < shift[1]) {
            callbackError(date)
          }

          if (shift[0] < endTime && endTime < shift[1]) callbackError(date)

          if (startTime < shift[0] && endTime > shift[1]) callbackError(date)

          if (shift[0] - endTime < 1) {
            callback(
              new Error(
                `Lỗi trong thứ ${date}. Hai timeblock liền kề phải cách nhau ít nhất 60 phút.`
              )
            )
          }
        })
      })

      callback()
    }

    return {
      rules: {
        name: [
          {
            required: true,
            message: 'Tên timesheet là bắt buộc',
            trigger: 'change',
          },
        ],
        timeline: [{ validator: validateTimeline, trigger: 'change' }],
      },
    }
  },
})
</script>
