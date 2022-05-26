<template>
  <div>
    <a-button icon="plus" type="primary" @click="visible = true">
      Thêm khoản ngoài hệ thống
    </a-button>

    <a-modal
      v-model="visible"
      centered
      title="Thêm khoản thu nhập nhân sự ngoài hệ thống"
      width="800px"
      @ok="handleSubmit"
    >
      <a-form-model
        ref="formRef"
        :label-col="{ span: 5 }"
        :model="formModel"
        :rules="rules"
        :wrapper-col="{ span: 18 }"
        @submit="$emit('submit')"
        @submit.native.prevent
      >
        <a-form-model-item label="Tên nhân sự" prop="user_id">
          <select-staff
            v-model="formModel.user_id"
            size="large"
            placeholder="Nhập tên hoặc mã nhân sự"
          ></select-staff>
        </a-form-model-item>

        <a-form-model-item label="Tên khoản" prop="name">
          <a-input
            v-model="formModel.name"
            :formatter="formatter({ thousandsSeparator: ',' })"
            class="!w-full"
            placeholder="Nhập tên khoản"
            size="large"
          />
        </a-form-model-item>

        <a-form-model-item label="Số tiền" prop="additional_amount">
          <a-input-number
            v-model="formModel.additional_amount"
            :formatter="formatter({ thousandsSeparator: ',' })"
            class="!w-full"
            placeholder="Nhập số tiền"
            size="large"
          />
        </a-form-model-item>

        <a-form-model-item label="Loại kỳ khoản" prop="duration">
          <div class="w-2/5">
            <select-duration
              :duration-value.sync="formModel.duration"
            ></select-duration>
          </div>
        </a-form-model-item>

        <a-form-model-item label="Kỳ khoản">
          <div class="w-2/5" prop="amount_type_time">
            <select-amount-type-time-month
              v-if="formModel.duration === E_Duration.Month"
              :external-value.sync="formModel.month"
            ></select-amount-type-time-month>

            <select-amount-type-time-quarter
              v-if="formModel.duration === E_Duration.Quarter"
              :external-value.sync="formModel.quarter"
            ></select-amount-type-time-quarter>

            <select-amount-type-time-year
              v-if="formModel.duration === E_Duration.Year"
              :external-value.sync="formModel.year"
            ></select-amount-type-time-year>
          </div>
        </a-form-model-item>

        <a-form-model-item label="Mô tả" prop="note">
          <a-textarea
            v-model="formModel.note"
            :auto-size="{ minRows: 3, maxRows: 6 }"
          />
        </a-form-model-item>

        <a-form-model-item label="Chứng từ kèm theo" prop="attached_files">
          <base-upload
            :file-list.sync="formModel.attachments"
            folder="hrm/income-amounts"
            multiple
          ></base-upload>
        </a-form-model-item>
      </a-form-model>

      <template slot="footer">
        <a-button
          key="submit"
          :loading="loading"
          type="primary"
          @click="handleSubmit"
        >
          Xác nhận tạo
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  watch,
} from '@nuxtjs/composition-api'
import SelectStaff from '@select/select-staff.vue'
import SelectAmountTypeTimeMonth from '@/components/select/select-amount-type-time-month.vue'
import SelectAmountTypeTimeQuarter from '@/components/select/select-amount-type-time-quarter.vue'
import SelectAmountTypeTimeYear from '@/components/select/select-amount-type-time-year.vue'
import SelectDuration from '@/components/select/select-duration.vue'
import { useServiceIncomeAmountDetail } from '@/services'
import { useForm, useNotification } from '@/composables'
import { formatter } from '@/utils'
import { E_Duration } from '@/enums/incomeAmount'
import { useResetReactive } from '@/composables/useResetReactive'

export default defineComponent({
  name: 'ButtonThemKhoan',
  components: {
    SelectStaff,
    SelectAmountTypeTimeMonth,
    SelectAmountTypeTimeQuarter,
    SelectAmountTypeTimeYear,
    SelectDuration,
  },
  setup(_, context) {
    const { addOutside } = useServiceIncomeAmountDetail()
    const { validate } = useForm(context)
    const { error, success } = useNotification()
    const { state: formModel, reset } = useResetReactive({
      user_id: undefined,
      name: '',
      additional_amount: 0,
      duration: 1,
      note: '',
      attachments: [],
      month: undefined,
      quarter: undefined,
      year: undefined,
    })

    const state = reactive({
      visible: false,
      loading: false,
    })

    const handleSubmit = async () => {
      try {
        state.loading = true
        const attachmentsRequest = formModel.attachments.map(
          (item: any) => item.data[0]
        )

        await validate()
        await addOutside({ ...formModel, attachments: attachmentsRequest })
        success('Thêm khoản thu nhập nhân sự ngoài hệ thống thành công')
        state.visible = false
        reset()
        context.emit('done')
      } catch (e) {
        if (e === false) return

        error(e?.data || 'Vui lòng thử lại')
      } finally {
        state.loading = false
      }
    }

    watch(
      () => formModel.duration,
      () => {
        formModel.month = undefined
        formModel.quarter = undefined
        formModel.year = undefined
      }
    )

    return {
      ...toRefs(state),
      formModel,
      handleSubmit,
      formatter,
      E_Duration,
    }
  },
  data() {
    return {
      rules: {
        user_id: [
          {
            required: true,
            message: 'Tên nhân sự là bắt buộc',
            trigger: 'change',
          },
        ],
        name: [
          {
            required: true,
            message: 'Tên tài khoản là bắt buộc',
            trigger: 'change',
          },
          { min: 3, message: 'Tên khoản không được nhỏ hơn 3 kí tự' },
        ],
        additional_amount: [
          {
            required: true,
            message: 'Số tiền là bắt buộc',
            trigger: 'change',
          },
        ],
        duration: [
          {
            required: true,
            message: 'Loại kỳ khoản là bắt buộc',
            trigger: 'change',
          },
        ],
        amount_type_time: [
          {
            required: true,
            message: 'Loại kỳ khoản là bắt buộc',
            trigger: 'change',
          },
        ],
        note: [
          {
            required: true,
            message: 'Tên chú thích là bắt buộc',
            trigger: 'change',
          },
          { min: 3, message: 'Tên chú thích không được nhỏ hơn 3 kí tự' },
        ],
        attached_files: [
          {
            required: false,
            message: 'Chứng từ kèm theo là bắt buộc',
            trigger: 'change',
          },
        ],
      },
    }
  },
})
</script>
