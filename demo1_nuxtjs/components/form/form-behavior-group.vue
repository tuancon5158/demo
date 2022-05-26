<template>
  <a-form-model
    ref="formRef"
    :model="form"
    :rules="rules"
    @submit="$emit('submit')"
    @submit.native.prevent
  >
    <a-form-model-item label="Tên nhóm hành vi" prop="name">
      <a-input v-model="form.name" size="large"></a-input>
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
import { useForm } from '@/composables'
import { IBehaviorGroupForm } from '@/interfaces/behaviorGroup'

export default defineComponent({
  name: 'FormBehaviorGroup',
  props: {
    value: {
      type: Object as PropType<IBehaviorGroupForm>,
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
            message: 'Tên nhóm hành vi là bắt buộc',
            trigger: 'change',
          },
        ],
      },
    }
  },
})
</script>
