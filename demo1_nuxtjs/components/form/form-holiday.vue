<template>
  <a-form-model
    ref="formRef"
    :model="form"
    :rules="rules"
    @submit="$emit('submit')"
    @submit.native.prevent
  >
    <a-form-model-item label="Tên ngày lễ" prop="name">
      <a-input v-model="form.name" size="large"></a-input>
    </a-form-model-item>

    <a-form-model-item label="Mô tả" prop="description">
      <a-textarea
        v-model="form.description"
        :auto-size="{ minRows: 3, maxRows: 6 }"
      ></a-textarea>
    </a-form-model-item>

    <a-form-model-item label="Trạng thái">
      <base-switch
        v-model="form.status"
        :active-value="1"
        :inactive-value="0"
      ></base-switch>
    </a-form-model-item>

    <a-form-model-item label="Hệ số lương" prop="wage_weight">
      <a-input-number
        v-model="form.wage_weight"
        size="large"
        class="!w-full"
        :step="0.1"
      ></a-input-number>
    </a-form-model-item>

    <a-form-model-item label="Chọn màu" prop="color">
      <base-color-picker
        v-model="form.color"
        :predefine="['#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1']"
      ></base-color-picker>
    </a-form-model-item>

    <a-form-model-item label="Ngày bắt đầu" prop="from_date">
      <base-datepicker
        v-model="form.from_date"
        :disabled-date="disabledStartDate"
        placeholder="Chọn ngày"
        @openChange="handleStartOpenChange"
      ></base-datepicker>
    </a-form-model-item>

    <a-form-model-item label="Ngày kết thúc" prop="to_date">
      <base-datepicker
        v-model="form.to_date"
        :open="endOpen"
        :disabled-date="disabledEndDate"
        placeholder="Chọn ngày"
        @openChange="handleEndOpenChange"
      ></base-datepicker>
    </a-form-model-item>

    <a-form-model-item label="Timesheet áp dụng" prop="time_sheets">
      <select-timesheet v-model="form.time_sheets" multiple></select-timesheet>

      <a-checkbox v-model="form.apply_for_flex_time_sheet">
        Áp dụng cho các timesheet linh hoạt
      </a-checkbox>
    </a-form-model-item>

    <a-form-model-item label="File phê duyệt" prop="files">
      <base-upload
        :file-list.sync="form.files"
        folder="hrm/holidays"
      ></base-upload>
    </a-form-model-item>

    <button v-show="false" type="submit">Submit</button>
  </a-form-model>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  toRef,
} from '@nuxtjs/composition-api'
import SelectTimesheet from '@select/select-timesheet.vue'
import { useForm, useDatePickerRange } from '@/composables'
import { IHolidayForm } from '@/interfaces/holiday'

export default defineComponent({
  name: 'FormHoliday',
  components: { SelectTimesheet },
  props: {
    value: {
      type: Object as PropType<IHolidayForm>,
      required: true,
    },
  },
  setup(props, context) {
    const form = reactive(props.value)

    const { validate } = useForm(context)

    const {
      disabledEndDate,
      disabledStartDate,
      handleEndOpenChange,
      handleStartOpenChange,
      endOpen,
    } = useDatePickerRange({
      startDate: toRef(form, 'from_date'),
      endDate: toRef(form, 'to_date'),
    })

    return {
      form,
      validate,

      disabledEndDate,
      disabledStartDate,
      handleEndOpenChange,
      handleStartOpenChange,
      endOpen,
    }
  },
  data() {
    return {
      rules: {
        name: [
          {
            required: true,
            message: 'Tên ngày lễ là bắt buộc',
            trigger: 'change',
          },
        ],
        description: [
          {
            required: true,
            message: 'Mô tả là bắt buộc',
            trigger: 'change',
          },
        ],
        wage_weight: [
          {
            type: 'number',
            min: 0.1,
            required: true,
            message: 'Hệ số lương là bắt buộc',
            trigger: 'change',
          },
        ],
        from_date: [
          {
            required: true,
            message: 'Ngày bắt đầu là bắt buộc',
            trigger: 'change',
          },
        ],
        to_date: [
          {
            required: true,
            message: 'Ngày kết thúc là bắt buộc',
            trigger: 'change',
          },
        ],
        files: [
          {
            type: 'array',
            required: true,
            message: 'File phê duyệt là bắt buộc',
            trigger: 'change',
          },
        ],
      },
    }
  },
})
</script>
