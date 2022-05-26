<template>
  <a-form-model
    ref="formRef"
    :model="form"
    :rules="rules"
    @submit="$emit('submit')"
    @submit.native.prevent
  >
    <a-form-model-item label="Mã thang" prop="code">
      <a-input v-model="form.code" size="large"></a-input>
    </a-form-model-item>

    <a-form-model-item label="Giá trị" prop="amount">
      <a-input-number
        v-model="form.amount"
        :formatter="formatter({ thousandsSeparator: ',' })"
        :step="10000"
        class="!w-full"
        size="large"
      ></a-input-number>
    </a-form-model-item>

    <a-form-model-item label="Trạng thái">
      <base-switch
        v-model="form.status"
        :active-value="1"
        :inactive-value="0"
      ></base-switch>
    </a-form-model-item>

    <button v-show="false" type="submit">Submit</button>
  </a-form-model>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from '@nuxtjs/composition-api'
import { useForm } from '@/composables'
import { formatter } from '@/utils'
import { IWageScaleForm } from '@/interfaces/wageScale'

export default defineComponent({
  name: 'FormWageScale',
  props: {
    value: {
      type: Object as PropType<IWageScaleForm>,
      required: true,
    },
  },
  setup(props, context) {
    const form = reactive(props.value)

    const { validate } = useForm(context)

    return { form, formatter, validate }
  },
  data() {
    return {
      rules: {
        code: [
          {
            required: true,
            message: 'Mã thang là bắt buộc',
            trigger: 'change',
          },
        ],
        amount: [
          {
            required: true,
            message: 'Giá trị là bắt buộc',
            trigger: 'change',
          },
        ],
      },
    }
  },
})
</script>
