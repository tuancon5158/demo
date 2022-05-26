<template>
  <div>
    <a-button icon="plus" type="primary" @click="visible = true">
      Tạo mới nhân sự
    </a-button>

    <a-modal
      v-model="visible"
      width="800px"
      centered
      title="Thêm khoản thu nhập nhân sự ngoài hệ thống"
      @ok="handleSubmit"
    >
      <a-form-model
        ref="formRef"
        :model="formModel"
        :rules="rules"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 18 }"
        @submit="$emit('submit')"
        @submit.native.prevent
      >
        <a-form-model-item label="Tên khoản" prop="additional_name">
          <a-input
            v-model="formModel.additional_name"
            :formatter="formatter({ thousandsSeparator: ',' })"
            class="!w-full"
            size="large"
            placeholder="Nhập tên khoản"
          />
        </a-form-model-item>

        <a-form-model-item label="Số tiền" prop="additional_amount">
          <a-input-number
            v-model="formModel.additional_amount"
            :formatter="formatter({ thousandsSeparator: ',' })"
            class="!w-full"
            size="large"
            placeholder="Nhập số tiền"
          />
        </a-form-model-item>

        <a-form-model-item label="Loại kỳ khoản" prop="amount_type">
          <a-select
            v-model="formModel.amount_type"
            style="width: 40%"
            placeholder="Chọn loại kỳ khoản"
          >
            <a-select-option value="month">Kỳ theo Tháng</a-select-option>
            <a-select-option value="quarter">Kỳ theo Quý</a-select-option>
            <a-select-option value="year">Kỳ theo Năm</a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item label="Kỳ khoản" prop="amount_type_time">
          <a-select
            v-model="formModel.amount_type_time"
            style="width: 40%"
            placeholder="Chọn kỳ khoản"
          >
            <a-select-option value="male">male</a-select-option>
            <a-select-option value="female">female</a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item label="Mô tả" prop="note">
          <a-textarea
            v-model="formModel.note"
            :auto-size="{ minRows: 3, maxRows: 6 }"
          />
        </a-form-model-item>

        <a-form-model-item label="Chứng từ kèm theo" prop="attached_files">
          <base-upload
            :file-list.sync="formModel.attached_files"
            folder="hrm/hr_records"
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
import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api'
import { useForm, useNotification } from '@/composables'
import { useServiceIncomeAmountDetail } from '@/services'
import { formatter } from '@/utils'
import { useResetReactive } from '@/composables/useResetReactive'

export default defineComponent({
  name: 'ButtonThemNhanSu',

  setup(_, context) {
    const { add } = useServiceIncomeAmountDetail()
    const { validate } = useForm(context)
    const { error, success } = useNotification()
    const { state: formModel, reset } = useResetReactive({
      additional_name: '',
      additional_amount: 0,
      note: '',
      attached_files: [],
    })

    const state = reactive({
      visible: false,
      loading: false,
    })

    const handleSubmit = async () => {
      try {
        state.loading = true

        await validate()
        await add({
          ...formModel,
        })

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

    return { ...toRefs(state), formModel, handleSubmit, formatter }
  },

  data() {
    return {
      rules: {
        additional_name: [
          {
            required: true,
            message: 'Tên tài khoản là bắt buộc',
            trigger: 'change',
          },
        ],
        additional_amount: [
          {
            required: true,
            message: 'Số tiền là bắt buộc',
            trigger: 'change',
          },
        ],
        amount_type: [
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
            required: false,
            message: 'Ghi chú là bắt buộc',
            trigger: 'change',
          },
        ],
        attached_files: [
          {
            required: true,
            message: 'Chứng từ kèm theo là bắt buộc',
            trigger: 'change',
          },
        ],
      },
    }
  },
})
</script>
