<template>
  <a-form-model
    ref="formRef"
    :model="form"
    :rules="rules"
    @submit="$emit('submit')"
    @submit.native.prevent
  >
    <a-form-model-item>
      <div class="flex-1 flex flex-col space-y-1 leading-snug">
        <div>
          <span>Loại phục vụ:</span>
          <span>
            {{ getLabelPolicyRole(form.role) }}
          </span>
        </div>
        <div>
          <span class="inline">Chứng từ đính kèm:</span>
          <span class="inline">
            {{ form.model_code }}
          </span>
          <span>
            <tag-service-status
              :status="form.model_status"
              text
            ></tag-service-status>
          </span>
        </div>
        <div>
          <span>Ngày: {{ formattedDate }}</span>
        </div>
      </div>
    </a-form-model-item>

    <a-form-model-item label="Mô tả công việc" prop="note">
      <a-textarea
        v-model="form.note"
        :disabled="form.status !== 0"
        :auto-size="{ minRows: 3, maxRows: 6 }"
      />
    </a-form-model-item>

    <a-form-model-item label="Tài liệu" prop="docs">
      <base-upload
        :file-list.sync="form.docs"
        :disabled="form.status !== 0"
        folder="hrm/labor-contracts"
      ></base-upload>
    </a-form-model-item>

    <button v-show="false" type="submit">Submit</button>
  </a-form-model>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  reactive,
} from '@nuxtjs/composition-api'
import dayjs from 'dayjs'
import TagServiceStatus from '@/components/common/tag-service-status.vue'
import { useForm } from '@/composables'
import { usePolicyRole } from '@/state'
import { IInvoiceParticipantForm } from '@/interfaces/invoiceParticipant'

export default defineComponent({
  name: 'FormInvoiceParticipant',
  components: { TagServiceStatus },
  props: {
    value: {
      type: Object as PropType<IInvoiceParticipantForm>,
      required: true,
    },
  },
  setup(props, context) {
    const form = reactive(props.value)
    const { validate } = useForm(context)

    const { getLabelPolicyRole } = usePolicyRole()

    const formattedDate = computed(() => {
      return dayjs(form.created_at).format('DD/MM/YYYY')
    })

    return {
      form,
      validate,
      getLabelPolicyRole,
      formattedDate,
    }
  },
  data() {
    return {
      rules: {
        note: [
          {
            required: true,
            message: 'Mô tả công việc là bắt buộc',
            trigger: 'change',
          },
        ],
        docs: [
          {
            type: 'array',
            required: true,
            message: 'Tài liệu là bắt buộc',
            trigger: 'change',
          },
        ],
      },
    }
  },
})
</script>
