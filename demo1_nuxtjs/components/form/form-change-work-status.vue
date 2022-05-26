<template>
  <a-form-model
    ref="formRef"
    :label-col="{ span: 6 }"
    :model="form"
    :wrapper-col="{ span: 16 }"
    @submit="$emit('submit')"
    @submit.native.prevent
  >
    <a-form-model-item
      v-if="types === `end`"
      label="Ngày nghỉ việc"
      prop="time_check"
    >
      <div class="fbc space-x-2">
        <base-datepicker
          v-model="form.start_at"
          :disabled-date="disabledStartDate"
          placeholder="Chọn ngày"
          @openChange="handleStartOpenChange"
        ></base-datepicker>
      </div>
      <div>
        <a-radio-group
          v-model="form.work_status_id"
          :options="[
            {
              value: 10,
              label: `Xin nghỉ việc`,
            },
            {
              value: 11,
              label: `Cho nghỉ việc`,
            },
            {
              value: 12,
              label: `Bị đuổi việc`,
            },
          ]"
        />
      </div>
    </a-form-model-item>
    <a-form-model-item
      v-if="types === `return`"
      label="Ngày bắt đầu"
      prop="time_check"
    >
      <div class="fbc space-x-2">
        <base-datepicker
          v-model="form.start_at"
          :disabled-date="disabledStartDate"
          placeholder="Chọn ngày"
          @openChange="handleStartOpenChange"
        ></base-datepicker>
      </div>
      <div>
        <a-radio-group
          v-model="form.work_status_id"
          :options="[
            {
              value: 6,
              label: `Chính thức`,
            },
            {
              value: 5,
              label: `Thử việc`,
            },
            {
              value: 7,
              label: `Freelancer`,
            },
            {
              value: 4,
              label: `Tập sự`,
            },
          ]"
        />
      </div>
    </a-form-model-item>
    <a-form-model-item
      v-if="types === `pause`"
      label="Thời gian tạm dừng công việc"
      prop="time_check"
    >
      <div class="fbc space-x-2">
        <base-datepicker
          v-model="form.start_at"
          :disabled-date="disabledStartDate"
          placeholder="Bắt đầu"
          @openChange="handleStartOpenChange"
        ></base-datepicker>
        <base-datepicker
          v-model="form.end_at"
          :disabled-date="disabledEndDate"
          :open="endOpen"
          placeholder="Kết thúc"
          @openChange="handleEndOpenChange"
        ></base-datepicker>
      </div>
      <div>
        <a-radio-group
          v-model="form.work_status_id"
          :options="[
            {
              value: 9,
              label: `Nghỉ dài hạn khác`,
            },
            {
              value: 8,
              label: `Nghỉ sinh`,
            },
          ]"
        />
      </div>
    </a-form-model-item>
    <a-form-model-item label="Lý do" prop="reason">
      <a-textarea
        v-model="form.reason"
        :auto-size="{ minRows: 1, maxRows: 3 }"
      ></a-textarea>
    </a-form-model-item>

    <button v-show="false" type="submit">Submit</button>
  </a-form-model>
</template>

<script lang="ts">
import { defineComponent, reactive, toRef } from '@nuxtjs/composition-api'

import BaseDatepicker from '../elements/base-datepicker.vue'
import { useDatePickerRange, useForm } from '@/composables'

import { formatter } from '@/utils'

export default defineComponent({
  name: 'FormWorkStatus',
  components: { BaseDatepicker },
  props: {
    value: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      default: `pause`,
    },
  },
  setup(props, context) {
    const form = reactive(props.value)

    const { validate } = useForm(context)

    const {
      endOpen,
      handleStartOpenChange,
      handleEndOpenChange,
      disabledStartDate,
      disabledEndDate,
    } = useDatePickerRange({
      startDate: toRef(form, 'from_date'),
      endDate: toRef(form, 'to_date'),
    })

    const onRemoveTitle = (index: number) => {
      form.titles.splice(index, 1)
    }

    return {
      types: props.type,
      form,
      validate,

      onRemoveTitle,

      endOpen,
      handleStartOpenChange,
      handleEndOpenChange,
      disabledStartDate,
      disabledEndDate,
    }
  },
  data() {
    return {
      rules: {},
    }
  },
  methods: {
    formatter,
  },
})
</script>
