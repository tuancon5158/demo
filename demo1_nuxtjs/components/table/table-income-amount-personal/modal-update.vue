<template>
  <div>
    <a-button type="link" @click="visible = true">Cập nhật</a-button>

    <a-modal
      v-model="visible"
      centered
      title="Xác nhận thu nhập"
      @ok="handleSubmit"
    >
      <a-form-model
        ref="formRef"
        :model="formModel"
        :rules="rules"
        @submit="$emit('submit')"
        @submit.native.prevent
      >
        <a-form-model-item label="Số tiền" prop="approved_amount">
          <a-input-number
            v-model="formModel.approved_amount"
            :disabled="formModel.status !== 0"
            :formatter="formatter({ thousandsSeparator: ',' })"
            class="!w-full"
            size="large"
          />
        </a-form-model-item>

        <a-form-model-item label="Nội dung" prop="updated_reasons">
          <a-textarea
            v-model="formModel.updated_reasons"
            :auto-size="{ minRows: 3, maxRows: 6 }"
          />
        </a-form-model-item>

        <a-form-model-item label="Status" prop="status">
          <a-select
            v-model="formModel.status"
            :options="statusList"
            size="large"
          ></a-select>
        </a-form-model-item>

        <button v-show="false" type="submit">Submit</button>
      </a-form-model>

      <template slot="footer">
        <a-button key="back" @click="visible = false">Huỷ bỏ</a-button>
        <a-button key="submit" type="primary" @click="handleSubmit">
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
import { useStatusIncomeAmountDetail } from '@/state'
import { formatter } from '@/utils'

export default defineComponent({
  name: 'ModalUpdate',

  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props, context) {
    const { edit } = useServiceIncomeAmountDetail()
    const { statusList } = useStatusIncomeAmountDetail()
    const { validate } = useForm(context)
    const { error, success } = useNotification()
    const formModel = reactive({
      id: props.item.id,
      approved_amount: props.item.approved_amount || 0,
      updated_reasons: '',
      status: props.item.status || 0,
    })

    const state = reactive({
      visible: false,
    })

    const handleSubmit = async () => {
      try {
        await validate()
        await edit(formModel)
        success('Xác nhận thu nhập thành công')
        state.visible = false
        context.emit('done')
      } catch (e) {
        if (e === false) return

        error(e?.data || 'Vui lòng thử lại')
      }
    }

    return {
      ...toRefs(state),
      formModel,
      handleSubmit,
      formatter,
      statusList,
    }
  },
  data() {
    return {
      rules: {
        // approved_amount: [
        //   {
        //     required: true,
        //     message: 'Số tiền là bắt buộc',
        //     trigger: 'change',
        //   },
        // ],
        // updated_reasons: [
        //   {
        //     required: true,
        //     message: 'Nội dung là bắt buộc',
        //     trigger: 'change',
        //   },
        // ],
      },
    }
  },
})
</script>
