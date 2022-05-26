<template>
  <a-form-model
    ref="formRef"
    :model="form"
    :rules="rules"
    @submit="$emit('submit')"
    @submit.native.prevent
  >
    <a-form-model-item label="Tên chức danh" prop="name">
      <a-input v-model="form.name" size="large"></a-input>
    </a-form-model-item>

    <a-form-model-item label="Số cấp tối đa" prop="max_level">
      <select-level v-model="form.max_level"></select-level>
    </a-form-model-item>

    <a-form-model-item label="Định hướng" prop="career_path">
      <select-orientation v-model="form.career_path"></select-orientation>
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
import SelectOrientation from '@select/select-orientation.vue'
import SelectLevel from '@select/select-level.vue'
import { useForm } from '@/composables'
import { IPositionForm } from '@/interfaces/position'

export default defineComponent({
  name: 'FormPosition',
  components: { SelectLevel, SelectOrientation },
  props: {
    value: {
      type: Object as PropType<IPositionForm>,
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
            message: 'Tên chức danh là bắt buộc',
            trigger: 'change',
          },
        ],
        max_level: [
          {
            required: true,
            message: 'Số cấp tối đa là bắt buộc',
            trigger: 'change',
          },
        ],
        career_path: [
          {
            required: true,
            message: 'Định hướng là bắt buộc',
            trigger: 'change',
          },
        ],
      },
    }
  },
})
</script>
