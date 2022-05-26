<template>
  <a-form-model
    ref="formRef"
    :model="form"
    :rules="rules"
    @submit="$emit('submit')"
    @submit.native.prevent
  >
    <a-form-model-item label="Tên hệ số lương" prop="name">
      <a-input v-model="form.name" size="large"></a-input>
    </a-form-model-item>

    <a-form-model-item label="Đặc tính" prop="fields">
      <a-input v-model="form.fields" size="large"></a-input>
    </a-form-model-item>

    <a-form-model-item label="Hệ số" prop="weight">
      <a-input-number
        v-model="form.weight"
        size="large"
        class="!w-full"
        :step="0.1"
      ></a-input-number>
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

    <button v-show="false" type="submit">Submit</button>
  </a-form-model>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from '@nuxtjs/composition-api'
import { useForm } from '@/composables'
import { IWageWeightForm } from '@/interfaces/wageWeight'

export default defineComponent({
  name: 'FormWageWeight',
  props: {
    value: {
      type: Object as PropType<IWageWeightForm>,
      required: true,
    },
  },
  setup(props, context) {
    const form = reactive(props.value)

    const { validate } = useForm(context)

    return { form, validate }
  },
  data() {
    return {
      rules: {
        name: [
          {
            required: true,
            message: 'Tên hệ số lương là bắt buộc',
            trigger: 'change',
          },
        ],
        fields: [
          {
            required: true,
            message: 'Đặc tính là bắt buộc',
            trigger: 'change',
          },
        ],
        weight: [
          {
            required: true,
            message: 'Hệ số là bắt buộc',
            trigger: 'change',
          },
        ],
      },
    }
  },
})
</script>
