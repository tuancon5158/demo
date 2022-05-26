<template>
  <div>
    <a-button type="link" @click="visible = true">
      <a-icon type="plus-square" />

      Thêm khoản
    </a-button>

    <a-modal
      v-model="visible"
      centered
      title="Thêm khoản thu nhập nhân sự ngoài hệ thống"
      @ok="handleSubmit"
    >
      <span class="block text-xs text-error">
        *Sử dụng trong trường hợp nhân sự có khoản thu nhập đã được phê duyệt
        bởi: CEO, Kế toán trưởng, HR, Tài chính ngoài hệ thống.
      </span>

      <a-form-model
        ref="formRef"
        :model="formModel"
        :rules="rules"
        @submit="$emit('submit')"
        @submit.native.prevent
      >
        <a-form-model-item label="Số tiền" prop="additional_amount">
          <a-input-number
            v-model="formModel.additional_amount"
            :formatter="formatter({ thousandsSeparator: ',' })"
            class="!w-full"
            size="large"
          />
        </a-form-model-item>

        <a-form-model-item label="Ghi chú" prop="note">
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

        <button v-show="false" type="submit">Submit</button>
      </a-form-model>

      <template slot="footer">
        <a-button key="back" @click="visible = false">Huỷ bỏ</a-button>
        <a-button
          key="submit"
          :loading="loading"
          type="primary"
          @click="handleSubmit"
        >
          Xác nhận
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
  name: 'ModalThemKhoan',

  props: {
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    userId: { type: Number, required: true },
  },

  setup(props, context) {
    const { add } = useServiceIncomeAmountDetail()
    const { validate } = useForm(context)
    const { error, success } = useNotification()
    const { state: formModel, reset } = useResetReactive({
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
          month: props.month,
          year: props.year,
          user_id: props.userId,
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
        additional_amount: [
          {
            required: true,
            message: 'Số tiền là bắt buộc',
            trigger: 'change',
          },
        ],
        note: [
          {
            required: true,
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
