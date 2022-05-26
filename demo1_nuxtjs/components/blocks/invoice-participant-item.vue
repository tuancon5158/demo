<template>
  <div class="py-4 px-2 bg-light-200 rounded" @click="onRedirectUpdate">
    <div class="flex justify-start space-x-4">
      <div class="w-8">
        <img :src="srcIcon" />
      </div>

      <div class="flex-1 flex flex-col space-y-1">
        <div class="font-bold">
          <span>Ngày: {{ formattedDate }}</span>
        </div>
        <div>
          <span>Loại:</span>
          <span class="font-bold">
            {{ getLabelPolicyRole(invoiceParticipant.role) }}
            (ID{{ invoiceParticipant.id }})
          </span>
        </div>
        <div>
          <span class="inline">Chứng từ:</span>
          <span class="inline">
            {{ invoiceParticipant.model_code }}
          </span>
          <span>
            <tag-service-status
              :status="invoiceParticipant.model_status"
              text
            ></tag-service-status>
          </span>
        </div>
        <div v-if="invoiceParticipant.role === 'SHIPPING'">
          <span class="inline">Số km giao hàng:</span>
          <span class="inline">
            {{ invoiceParticipant.value || 0 }}
          </span>
        </div>
        <span>
          <span>Trạng thái:</span>
          <span>
            <tag-invoice-status
              :status="invoiceParticipant.status"
              text
            ></tag-invoice-status>
          </span>
        </span>
      </div>

      <a-icon type="right" class="self-center" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  useRouter,
} from '@nuxtjs/composition-api'
import dayjs from 'dayjs'
import TagInvoiceStatus from '@/components/common/tag-invoice-status.vue'
import TagServiceStatus from '@/components/common/tag-service-status.vue'
import { usePolicyRole } from '@/state'
import { IInvoiceParticipant } from '@/interfaces/invoiceParticipant'

export default defineComponent({
  name: 'InvoiceParticipantItem',
  components: { TagServiceStatus, TagInvoiceStatus },
  props: {
    invoiceParticipant: {
      type: Object as PropType<IInvoiceParticipant>,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter()

    const { getLabelPolicyRole } = usePolicyRole()

    const onRedirectUpdate = () => {
      return router.push(`/services/${props.invoiceParticipant.id}`)
    }

    const srcIcon = computed(() => {
      if (props.invoiceParticipant.role === 'PACKAGING') {
        return '/free-shipping.png'
      }

      if (props.invoiceParticipant.role === 'TECHNIQUE') {
        return '/software-box.png'
      }

      return '/computer.png'
    })

    const formattedDate = computed(() => {
      return dayjs(props.invoiceParticipant.created_at).format('DD/MM/YYYY')
    })

    return { onRedirectUpdate, getLabelPolicyRole, srcIcon, formattedDate }
  },
})
</script>
