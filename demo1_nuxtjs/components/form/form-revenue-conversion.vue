<template>
  <a-form-model
    ref="formRef"
    :model="form"
    :rules="rules"
    @submit="$emit('submit')"
    @submit.native.prevent
  >
    <a-form-model-item label="Tên ngành hàng" prop="name">
      <a-input v-model="form.name" size="large"></a-input>
    </a-form-model-item>

    <a-form-model-item label="Hệ số" prop="conversion_weight">
      <a-input-number
        v-model="form.conversion_weight"
        size="large"
        class="!w-full"
      ></a-input-number>
    </a-form-model-item>

    <a-form-model-item label="Nhóm hàng hoá" prop="product_group_id">
      <select-product-group
        v-model="form.product_group_id"
        size="large"
        class="!w-full"
      ></select-product-group>
    </a-form-model-item>

    <a-form-model-item label="Trạng thái">
      <base-switch
        v-model="form.status"
        :active-value="1"
        :inactive-value="0"
      ></base-switch>
    </a-form-model-item>

    <a-form-model-item label="Mô tả" prop="description">
      <a-textarea
        v-model="form.description"
        :auto-size="{ minRows: 3, maxRows: 6 }"
      ></a-textarea>
    </a-form-model-item>

    <button v-show="false" type="submit">Submit</button>
  </a-form-model>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from '@nuxtjs/composition-api'
import SelectProductGroup from '@select/select-product-group.vue'
import { useForm } from '@/composables'
import { IRevenueConversionForm } from '@/interfaces/revenueConversion'

export default defineComponent({
  name: 'FormRevenueConversion',
  components: { SelectProductGroup },
  props: {
    value: {
      type: Object as PropType<IRevenueConversionForm>,
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
            message: 'Tên ngành hàng là bắt buộc',
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
        conversion_weight: [
          {
            required: true,
            message: 'Hệ số là bắt buộc',
            trigger: 'change',
          },
        ],
        product_group_id: [
          {
            required: true,
            message: 'Nhóm hàng hoá là bắt buộc',
            trigger: 'change',
          },
        ],
      },
    }
  },
})
</script>
